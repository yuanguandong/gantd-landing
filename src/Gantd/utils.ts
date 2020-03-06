export function format(str:string){
  var stack = []; //栈-用于括号匹配
  var tmpStr = '';    //新格式化JSON字符串
  var len = str.length;   //原始JSON长度

  //遍历每一个字符
  for (let i = 0; i < len; i++) {

      //当遇到结构块起始结构
      if (str[i] == '{' || str[i] === '[') {

          //起始结构后面直接换行  
          tmpStr += str[i] + "\n";

          //入栈
          stack.push(str[i]);
          
          //这里的意思是结构块起始的下一行开始就会有一个缩进，缩进量与遇到的结构块起始符个数成正比1:1
          tmpStr += "\t".repeat(stack.length);
      } 
      //当遇到结构块结束符
      else if (str[i] == ']' || str[i] === '}') {

          //因为本身JSON格式是固定的，所以括号一定是成对的，这里先不考虑错误的json数据
          //遇到结束符就退栈，
          stack.pop();

          //结束符本身输出到下一行，并减少一个缩进
          tmpStr += "\n"+"\t".repeat(stack.length) + str[i];
      } 
      //当遇到逗号的时候
      else if (str[i] == `,`) {
          //逗号后方直接换行，以及下一行的缩进处理
          tmpStr += str[i] + "\n" + "\t".repeat(stack.length);
      } 
      else {
          //其他字符直接复制
          tmpStr += str[i];
      }
  }
  return tmpStr;
}

