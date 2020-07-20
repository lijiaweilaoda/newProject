<template>
  <div class="wapper">
    <div class="meau">
      <el-row class="tac">
        <el-col :span="12">
          <h5 style="background-color:#545c64;margin:0;line-hight:20px;font-size:20px;padding:30px">
            <i class="el-icon-s-operation"></i>
            目录
          </h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            border="none"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>礼物管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="1-1">所有礼物</el-menu-item>
                <el-menu-item index="1-2">所有商品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>线上资源</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="1-1">问卷</el-menu-item>
                <el-menu-item index="1-2">拼图</el-menu-item>
                <el-menu-item index="1-2">考试</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="header-left">
        <i class="el-icon-menu"></i>
        <span>所有拼图</span>
      </div>
      <div class="header-right">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加拼图</span>
      </div>
      <div class="biaoge">
        <el-table :data="tableData3" @selection-change="handleSelectionChange" style="width: 100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="编码" width="100">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="name" label="名字" width="120"></el-table-column>
          <el-table-column prop=" creatorName" label="创造者名字" width="150">
            <template slot-scope="scope">{{ scope.row.creatorName }}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" :formatter="statusFang"></el-table-column>
          <el-table-column prop="type" label="型号" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" :formatter="timestampToTime"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text"  class="dia"
                @click="handleEdit(scope.$index, scope.row)
                editFormVisible=true" 
                size="mini" >
                  编辑
                </el-button>
                    <el-dialog
                    title="编辑"
                    v-model="editFormVisible" :close-on-click-modal="false"
                    width="50%"
                    center>
                      <el-form :model="editForm"  label-width="100px"  ref="editForm">
                        <el-form-item
                          prop="name"
                          label="名字">
                          <el-input v-model="editForm.name"></el-input>
                        </el-form-item>

                        <el-form-item
                          prpo="status"
                          label="状态"
                          >
                          <el-input v-model="editForm.status"></el-input>
                        </el-form-item>

                        <el-form-item
                          prpo="type"
                          label="型号"
                          >
                          <el-input v-model="editForm.type"></el-input>
                        </el-form-item>

                        <el-form-item
                          prpo="crateTime"
                          label="创建时间"
                          >
                          <el-input v-model="editForm.createTime"></el-input>
                        </el-form-item>

                        <el-form-item>
                          <el-button type="primary" @click.native="editSubmit">提交</el-button>
                         
                          <el-button @click.native="editFormVisible=false">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
            
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, tableData3)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="fenye">
        <el-pagination layout="prev, pager, next" :total="200"></el-pagination>
        <div class="tz">
          <el-input v-model="input" placeholder class="tiao"></el-input>
          <el-button class="zhuan">跳转</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    
     
    
    handleEdit(index, row) {
      // console.log(index, row);
      console.log(row.name)
  
      this.editFormVisible = true;
			this.editForm = Object.assign({}, row)
    
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      alert("删除成功");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    timestampToTime(row, column) {
      var date = new Date(row.createTime * 1000);

      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
      console.log(timestampToTime(1594813660000));
    },
    statusFang(row, column) {
      if (row.status === "online") {
        return "上线";
      } else {
        return "下线";
      }
    }
  },

  data() {
    return {
      editForm:[
        {
          id:"",
          name:"",
          status:"",
          type:"",
          createTime:""
        }
      ],
      editFormVisible: false,
      current: 1,
      pageSize: 10,
      total: 11,
      totalPages: 2,
      input: "",
      tableData3: [
        {
          id: "1",
          name: "张三",
          creatorName: "c端管理员",
          status: "online",
          type: "pc",
          createTime: "1594813660"
        },
        {
          id: "2",
          name: "张三22",
          creatorName: "c端管理员",
          status: "outline",
          type: "APP",
          createTime: "1594813660"
        },
        {
          id: 3,
          name: "张三",
          creatorName: "c端管理员",
          status: "outline",
          type: "PC",
          createTime: "1594813660"
        },
        {
          id: 4,
          name: "张三sss",
          creatorName: "c端管理员",
          status: "online",
          type: "APP",
          createTime: "1594813660"
        },
        {
          id: 5,
          name: "张三",
          creatorName: "c端管理员",
          status: "outline",
          type: "PC",
          createTime: "1594813660"
        },
        {
          id: 6,
          name: "张三aaa",
          creatorName: "c端管理员",
          status: "online",
          type: "APP",
          createTime: "1594813660"
        },
        {
          id: 7,
          name: "张三zcbb",
          creatorName: "c端管理员",
          status: "outline",
          type: "PC",
          createTime: "1594813660"
        },
        {
          id: 8,
          name: "张三sfdsf",
          creatorName: "c端管理员",
          status: "online",
          type: "PC",
          createTime: "1594813660"
        },
        {
          id: 9,
          name: "张三123",
          creatorName: "c端管理员",
          status: "online",
          type: "APP",
          createTime: "1594813660"
        },
        {
          id: 10,
          name: "张三123",
          creatorName: "c端管理员",
          status: "online",
          type: "PC",
          createTime: "1594813660"
        }
      ]
    };
  },
  computed: {}
};
</script>
<style>
body {
  background-color: darkgray;
}
.meau {
  width: 250px;
  height: 800px;
  float: left;
  background-color: #545c64;
}

.tac {
  width: 100%;
}
.el-col {
  width: 100%;
  height: 600px;
}
.el-menu-item {
  padding: 0;
}
.main {
  float: left;
  width: 70%;
  margin-left: 5%;
  background-color: #ffffff;
}
.el-menu-vertical-demo {
  width: 100%;
}
.header-left {
  float: left;
  color: chartreuse;
  padding: 20px;
}
.header-right {
  float: right;
  color: chartreuse;
  padding: 20px;
}
.cell {
  text-align: center;
}

.bianji {
  float: left;
  margin-left: 20px;
  
}
.shanchu {
  float: right;
  margin-right: 20px;
}
.quanxuan {
  float: left;
  margin: 50px;
}
.fenye {
  margin: 55px;
}
.tz {
  width: 15 0px;
  float: right;
  margin-top: -30px;
}
.tiao {
  float: left;
  width: 75px;
  margin-right: 20px;
}
.zhuan {
  float: right;
}
.dia{padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;font-family: inherit;}
</style>