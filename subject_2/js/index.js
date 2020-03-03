var students = [
    {"STUDENTID":"11603080101","NAME":"小一","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080102","NAME":"小二","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080103","NAME":"小三","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"18"},
    {"STUDENTID":"11603080104","NAME":"小四","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"18"},
    {"STUDENTID":"11603080105","NAME":"小五","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"18"},
    {"STUDENTID":"11603080106","NAME":"小六","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080107","NAME":"小七","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080108","NAME":"小八","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080109","NAME":"小九","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080110","NAME":"十","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080111","NAME":"十一","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"},
    {"STUDENTID":"11603080112","NAME":"十二","COLLEGE":"计算机科学与工程","MAJOR":"软件工程","GRADE":"2016","CLASS":"1","AGE":"19"}
];

function operationIcon(value,row,index) {
    return[
        '<img alt="img-responsive" id="check" class="img-responsive" style="float: left" data-toggle="modal" data-target="#checkModal"  src="../images/check.png" />',
        '<img alt="img-responsive" id="edit" class="img-responsive" style="float: left" data-toggle="modal" data-target="#editModal" src="../images/edit.png" />',
        '<img alt="img-responsive" id="delete" class="img-responsive" style="float: left" src="../images/delete.png" />'
        ].join('');
}


/*每行表格尾部的小图标点击*/
window.operateEvents = {
    'click #check':function (e,value,row,index) {
        //将该行数据填入模态框中
        $('#check_STUDENTID').val(row.STUDENTID);
        $('#check_NAME').val(row.NAME);
        $('#check_COLLEGE').val(row.COLLEGE);
        $('#check_MAJOR').val(row.MAJOR);
        $('#check_GRADE').val(row.GRADE);
        $('#check_CLASS').val(row.CLASS);
        $('#check_AGE').val(row.AGE)
    },

    'click #edit':function (e,value,row,index) {
        //将该行数据填入模态框中
        $('#edit_STUDENTID').val(row.STUDENTID);
        $('#edit_NAME').val(row.NAME);
        $('#edit_COLLEGE').val(row.COLLEGE);
        $('#edit_MAJOR').val(row.MAJOR);
        $('#edit_GRADE').val(row.GRADE);
        $('#edit_CLASS').val(row.CLASS);
        $('#edit_AGE').val(row.AGE);

        $('#btEdit').on('click',function(){
            var inputRight = 1;
            var studentId = $('#edit_STUDENTID').val();
            var name = $('#edit_NAME').val();
            var college = $('#edit_COLLEGE').val();
            var major = $('#edit_MAJOR').val();
            var grade = $('#edit_GRADE').val();
            var clAss = $('#edit_CLASS').val();
            var age = $('#edit_AGE').val();

            var checkId = /^1\d{10}$/;   //验证学号的长度且是否为数字/^1\d{10}$/
            if(!checkId.test(studentId)){
                inputRight = 0;
            }
            var checkName = /^[\u4e00-\u9fa5]+$/;    //验证输入的名字是否为汉字
            if(!checkName.test(name)){
                inputRight = 0;
            }
            if(inputRight == 0){
                alert("输入数据不合法！");
            }
            else{
                $('#studentInformationTable').bootstrapTable('updateRow',{
                    index:index,
                    row:{
                        STUDENTID:studentId,
                        NAME:name,
                        COLLEGE:college,
                        MAJOR:major,
                        GRADE:grade,
                        CLASS:clAss,
                        AGE:age
                    }
                });
                $('#studentInformationTable').bootstrapTable('load',students);
                $('#editModal').modal('hide');
                index = null;
            }

        });
    },

    'click #delete':function (e,value,row,index) {
        var determine = confirm("确认删除？")
        if(determine==true){
            $('#studentInformationTable').bootstrapTable('remove',{
                field:'STUDENTID',
                values:[row.STUDENTID]
            });
        }
    }
};

/* 刷新方法 */
function refresh(){
    $('#studentInformationTable').bootstrapTable('refresh', null);
}

function add() {
    var inputRight = 1;
    var studentId = $('#add_STUDENTID').val();
    var name = $('#add_NAME').val();
    var college = $('#add_COLLEGE').val();
    var major = $('#add_MAJOR').val();
    var grade = $('#add_GRADE').val();
    var clAss = $('#add_CLASS').val();
    var age = $('#add_AGE').val();

    var checkId = /^1\d{10}$/;   //验证学号的长度且是否为数字/^1\d{10}$/
    if(!checkId.test(studentId)){
        inputRight = 0;
    }
    var checkName = /^[\u4e00-\u9fa5]+$/;    //验证输入的名字是否为汉字
    if(!checkName.test(name)){
        inputRight = 0;
    }
    if(inputRight == 0){
        alert("输入数据不合法！");
    }
    else{
        var student = "{"+"\""+"STUDENTID"+"\""+":"+"\""+studentId+"\""+","
            +"\""+"NAME"+"\""+":"+"\""+name+"\""+","
            +"\""+"COLLEGE"+"\""+":"+"\""+college+"\""+","
            +"\""+"MAJOR"+"\""+":"+"\""+major+"\""+","
            +"\""+"GRADE"+"\""+":"+"\""+grade+"\""+","
            +"\""+"CLASS"+"\""+":"+"\""+clAss+"\""+","
            +"\""+"AGE"+"\""+":"+"\""+age+"\""+"}";
        students.unshift(JSON.parse(student));
        $('#studentInformationTable').bootstrapTable('load',students);

        $('#addModal').modal('hide');
    }

}


function deletes() {
    var data = $('#studentInformationTable').bootstrapTable('getSelections');
    console.log(data);
    if(data.length==0){
        alert("请至少选中一条数据");
        return;
    }
    var ids = "";
    var determine = confirm("确认删除？")
    if(determine==true){
        for(var i=0; i<data.length; i++){
            $('#studentInformationTable').bootstrapTable('remove',{
                field:'STUDENTID',
                values:[data[i].STUDENTID]
            });
        }
    }
}

/*定义表格*/
$(function () {
    $('#studentInformationTable').bootstrapTable({
        //height: 400,//定义表格的高度
        data:students,
        search:true,
        striped: true,// 隔行变色效果
        pagination: true,//在表格底部显示分页条
        pageSize: 10,//页面数据条数
        // sidePagination: "server",
        //pageNumber:1,//首页页码
        //showRefresh:true,
        pageList: [5, 8, 10, 20],//设置可供选择的页面数据条数
        clickToSelect:false,//设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache: false,//禁用 AJAX 数据缓存
        toolbar : '#toolbar',//工具按钮容器
        //sortName:'OPERATORID',//定义排序列
        //sortOrder:'asc',//定义排序方式
        // sidePagination:'server',//设置在哪里进行分页
        columns:[{
            checkbox:true,//勾选框
            width:'3'//宽度
        },{
            title:'序号',
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'5',//宽度
            formatter:function (value,row,index) {//生成序号
                return index+1;
            }
        },{
            field:'STUDENTID',//返回值名称
            title:'学号',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'5'//宽度
        },{
            field:'NAME',//返回值名称
            title:'姓名',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10'//宽度
        },{
            field:'COLLEGE',//返回值名称
            title:'学院',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'20'//宽度
        },{
            field:'MAJOR',//返回值名称
            title:'专业',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10'//宽度
        },{
            field:'GRADE',//返回值名称
            title:'年级',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10'//宽度
        },{
            field:'CLASS',//返回值名称
            title:'班级',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10'//宽度
        },{
            field:'AGE',//返回值名称
            title:'年龄',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10'//宽度
        },{
            field:'OPRATE',//返回值名称
            title:'操作',//列名
            align:'center',//水平居中显示
            valign:'middle',//垂直居中显示
            width:'10',//宽度
            events:operateEvents,
            formatter:operationIcon
        }]//列配置项,详情请查看 列参数 表格
        /*事件*/
    });
});