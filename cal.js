function MyStack(){
    this.stackTop = -1;// 栈的指针
    this.stackSize = 50;// 栈的容量
    this.stack = new Array();
 
    // 入栈操作
    this.push = function(val){
        if(this.stackTop == this.stackSize-1){
            alert("栈已经满了");
        }
        this.stackTop++;
        this.stack[this.stackTop] = val;
    }
 
    // 出栈操作
    this.pop = function(){
        if(this.stackTop == -1){
            alert("栈内没有数据");
        }
        var stackTopVal = this.stack[this.stackTop];
        this.stackTop--;
        return stackTopVal;
    }
 
    // 显示栈内的数据
    this.show = function(){
        if(this.stackTop == -1){
            alert("栈内没有数据");
        }
        for(var i = this.stackTop; i>-1; i--){
            alert(this.stack[i]);
        }
    }
 
    // 判断当前字符是数值还是运算符
    this.isOper = function(cha){
        if(cha == "+" || cha == "-" || cha == "*" || cha == "/"){
            return true;
        }else{
            return false;
        }
    }
 
    // 判断栈是否为空
    this.isEmpty = function(){
        if(this.stackTop == -1){
            return true;
        }else{
            return false;
        }
    }
 
    // 获取运算符的优先级
    this.PRI = function(cha){
        if(cha == "*" || cha == "/"){
            return 1;
        }else if(cha == "+" || cha == "-"){
            return 0;
        }
    }
 
    // 获取栈顶的字符
    this.getTop = function(){
        return this.stack[this.stackTop];
    }
 
    // 计算函数
    this.result = function(num1,num2,oper){
        var res = 0;
        switch(oper){
            case '+':
                res = Number(num2) + Number(num1);// 数据必须先要转换
                break;
            case '-':
                res = Number(num2) - Number(num1);
                break;
            case '*':
                res = Number(num2) * Number(num1);
                break;
            case '/':
                res = Number(num2) / Number(num1);
                break;
        }
        return res;
    }
}
 
// 定义两个栈：数值栈和运算符栈
var valueStack = new MyStack();
var operStack = new MyStack();
 
function Count(){
    var exp = document.getElementById("exp").value;
 
    var index = 0;// 扫描指针
     
    var spliceNum = "";// 用来拼接多位数的变量
 
    while(true){
         
        // 取出字符
        var cha = exp.substr(index, 1);
        // 判断cha
        if(operStack.isOper(cha)){
            // 是运算符,判断运算符栈是否为空
            if(operStack.isEmpty()){
                // 放入运算符栈
                operStack.push(cha);
            }else{
 
                while(!operStack.isEmpty() && operStack.PRI(cha) <= operStack.PRI(operStack.getTop())){
 
                    // 从数值栈出栈两个数值
                    var num1 = valueStack.pop();
                    var num2 = valueStack.pop();
 
                    // 再从运算符栈出栈一个运算符
                    var oper = operStack.pop();
 
                    // 调用计算函数
                    var res = operStack.result(num1, num2, oper);
 
                    // 把结果放入数值栈
                    valueStack.push(res);
 
                }
                // 把当前运算符放入运算符栈
                operStack.push(cha);
 
            }
 
        }else{
            // 是数值，放入数值栈
            spliceNum = spliceNum + cha;
            // 先判断是否到了字符串的最后，如果到了，就直接放入数值栈
            if(index == exp.length-1){
                valueStack.push(spliceNum);
            }else{
                // 判断cha字符的下一个字符是数字还是运算符
                if(operStack.isOper(exp.substr(Number(index)+1, 1))){
                    // 如果是运算符，直接入栈
                    valueStack.push(spliceNum);
                    spliceNum = "";
                }else{
                    // 如果是数字，则不做处理,继续循环拼接全部数字
                }
            }
             
        }
 
        // 让扫描指针指向下一个字符
        index++;
         
        // 判断是否扫描完毕,扫描完毕，break.
        if(index == exp.length){
            break;
        }
 
    }
 
    // 如果运算符栈不为空就一直计算
    while(!operStack.isEmpty()){
        // 从数值栈出栈两个数值
        var num1 = valueStack.pop();
        var num2 = valueStack.pop();
        // 再从运算符栈出栈一个运算符
        var oper = operStack.pop();
        // 调用计算函数
        var res = operStack.result(num1, num2, oper);
        // 把结果放入数值栈
        valueStack.push(res);
    }
 
    // 在退出循环后，数值栈中留下的数值，就是最终结果
    alert(exp+'结果='+valueStack.getTop());
}
