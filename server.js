const express = require('express');
//mongoose connection
const cheer = require('./config/connection');
const routes = require('./routes');

const serial = express();
const PORT = process.env.PORT || 3013;

serial.use(express.json());
serial.use(express.urlencoded({ extended: true }));
serial.use(routes);

//start server
cheer.once('open', () => {
    serial.listen(PORT, () => {
        console.log(`
=====================================================================
*********************** SERIAL SOCIAL's BACK END *********************
=====================================================================

                                           .""--..__
                     _                     []       ''-.._
                  .'' ''.                  ||__           '-._
                 /    ,-.'                 ||_ '''---..__     '-.
                /    /:::;'               /|//}          ''--._  '.
                |    |:::||              |////}                '-. ;
                |    |:::||             //'///                    '.;
                |    |:::||            //  ||'                      '|
                /    |:::|/        _,-//'  ||
               /'    |:::|'-,__,-'  |/  ' ||
             /'  |   |'' ||           ;   |||
           /'    ;   |   ||            |  /||
         |'       |  |   |)            ; | ||
        |          ; |   /      ,.__    ;| ||
        /           '         /'    ';   | ||
       |                     /        ;  / ||
       |                     |        | /  ||
       /         /           |        '(   ||
      /          .           /          )  ||
     |            ;          |             ||
    /             |          /             .|
   |;            /          |              ||
   ;/'-._       |           /              ||
    //   '.    /'           |              ||
   //'.    '. |             ;              ||
  ///; '-._  )/             |              ||
 //// )   .(/               |              ||
 ||||   ,' )               /              //
 ||||  /                    /             || 
 '''' /'                    |             // 
     |'                     ;            ||  
    /                        |           //  
  /'                          ;         //   
/'                            |        ||    
'-.___,-.      .-.        ___,'        (/    
         '---''   ''----'

        =============================
           Welcome to SERIAL SOCIAL  
        #1 TRUE CRIME SOCIAL NETWORK
        =============================

        join in on the criminology:
        http://localhost:${PORT}`);
 
    })
})