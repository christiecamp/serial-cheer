const express = require('express');
const cheer = require('./config/connection');
const routes = require('./routes');

const serial = express();
const PORT = process.env.PORT || 3013;

serial.use(express.json());
serial.use(express.urlencoded({ extended: true }));
serial.use(routes);

cheer.once('open', () => {
    serial.listen(PORT, () => {
        console.log(`
=====================================================================
*********************** SERIAL CHEER's BACK END *********************
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
     |            ;          |     ________||
    /             |          /     '-------.|
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
           Welcome to SERIAL CHEER  
        #1 TRUE CRIME SOCIAL NETWORK
        =============================

        join in on the criminology:
        http://localhost:${PORT}`);
 
    })
})