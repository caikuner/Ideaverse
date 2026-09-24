encodeURIComponent(str);

对于 application/x-www-form-urlencoded (POST) 这种数据方式，空格需要被替换成 '+'，所以通常使用 encodeURIComponent 的时候还会把 "%20" 替换为 "+"。  
（url 中空格被替换成+是比较古早的规范，现在是会变成 %20 的）
