@ECHO OFF
SET /p lib_jquery=Install JQuery(Y or N):
SET /p lib_maskedinput=Install input masked(Y or N):
SET /p lib_popup=Install Magnific popup(Y or N):
SET /p answer=silent install project(Y or N):


IF NOT EXIST assets MD assets
IF NOT EXIST assets\default MD assets\default
IF NOT EXIST assets\js MD assets\js
IF NOT EXIST assets\img MD assets\img
IF NOT EXIST assets\img\svg MD assets\img\svg
IF NOT EXIST assets\scss MD assets\scss
IF NOT EXIST assets\tmpl MD assets\tmpl
IF NOT EXIST assets\libs MD assets\libs
IF NOT EXIST assets\fonts MD assets\fonts

IF NOT EXIST assets\index.pug (ECHO !>>assets\index.pug)

CALL npm i bower -g
IF NOT EXIST .bowerrc (ECHO {"directory" : "assets/libs/"}>>.bowerrc)

IF %lib_jquery%==y IF %lib_jquery%==Y CALL bower i jquery 
IF %lib_maskedinput%==y IF %lib_maskedinput%==Y CALL bower i jquery.maskedinput 
IF %lib_popup%==y IF %lib_maskedinput%==Y CALL bower i magnific-popup

IF %answer%==n IF %answer%==N CALL npm init 

IF %answer%==y IF %answer%==Y CALL npm init -f
CALL npm i gulp gulp-sass browser-sync gulp-cssnano gulp-autoprefixer gulp-concat gulp-uglify gulp-imagemin imagemin-mozjpeg imagemin-pngquant gulp-cache del gulp-pug gulp-rename gulp-svgmin gulp-svg-symbols gulp-svg2png -D

SET /p fin=Delet install.bat file(Y or N):
IF %fin%==y IF %fin%==Y DEL install.bat
