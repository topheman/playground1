playground.desktop = (function(){
    
    var socket,
    balls = {}
    ;
    
    function init(){
        socketConnect();
        render();//activer au callback ?
    }

    function updateCoordinates(){
        document.getElementById("coords").innerHTML = "inputX : "+inputX+" - inputY : "+inputY;
        window.requestAnimFrame(updateCoordinates);
    }
    
    function socketConnect(){
        socket = io.connect('http://'+playground.common.environnement.hostname+':'+playground.common.environnement.port);
        socket.on('who-is-there',function(data){
            socket.emit('desktop-connect',{});
        });
        socket.on('desktop-connected',function(data){
            console.log('desktop connected (important ?)',data);
        });
        socket.on('desktop-add-mobile',function(data){
            console.log('desktop add mobile',data);
            addMobile(data);
        });
        socket.on('desktop-remove-mobile',function(data){
            console.log('desktop remove mobile',data);
            removeMobile(data);
        });
        socket.on('desktop-update-motion-infos',function(data){
            console.log('desktop update',data);
            updateMotionInfos(data);
        });
    }
    
    function addMobile(data){
        balls[data.id] = {
            color: data.color
        }
        console.info('addMobile',data,balls);
        document.getElementById('infos').innerHTML += '<li id="'+data.id+'" style="color:'+data.color+'"><span>toto</span></li>';
    }
    
    function removeMobile(data){
        console.info('removeMobile>',data,balls);
        delete balls[data.id];
        var elem = document.getElementById(data.id);
        elem.parentNode.removeChild(elem);
        console.info('>removeMobile',data,balls);
    }
    
    function updateMotionInfos(mobiles){
        console.info('updateMotionInfos');
        loop1: for(var id in balls){
            loop2: for(var mobileId in mobiles){
                if(mobileId === id){
                    updateBall(balls[id],mobiles[mobileId]);
                    break loop2;
                }
            }
        }
    }
    
    function updateBall(ball,mobileInfos){
        ball.inputX = mobileInfos.inputX;
        ball.inputY = mobileInfos.inputY;
    }
    
    function renderInfos(){
        for(var id in balls){
            document.getElementById(id).innerHTML = '<span>inputX : '+balls[id].inputX+' - inputY : '+balls[id].inputY+'</span>';
        }
    }
    
    function renderScreen(){
        
    }
    
    function render(){
        renderInfos();
        renderScreen();
        window.requestAnimFrame(render);
    }
    
    return {
        init : init
    }
    
})()