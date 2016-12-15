<%
String find=request.getParameter("find");
String[] list={"sadText123","sdText123","123Textwe","asdTextasd","asdText12","123Text123","sdfText123","werText12","Text12","Text12we","Textasd","Text789","Text1","Text12","Text789","Text342","Text3","Text234","Text123"};
String respon="";
for(int i=0;i<list.length;i++){
	if(list[i].contains(find)){
		respon+=(list[i]+",");
	}
}
out.print(respon);
%>