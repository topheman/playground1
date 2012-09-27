playground.desktop = (function(){
    
    var socket,
    balls = {},
    width,
    height,
    ctx,
    DEVICEMOTION_INPUT_RATIO = 0.2;
    ;
    
    function init(){
        prepareCanvas();
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
//            console.log('desktop update',data);
            updateMotionInfos(data);
            manageCollisions();
        });
    }
    
    function addMobile(data){
        balls[data.id] = new Ball(data.x, data.y, playground.common.ballConst.radius, playground.common.ballConst.mass, playground.common.ballConst.gravity, playground.common.ballConst.elasticity, playground.common.ballConst.friction, data.color, playground.common.ballConst.lifeTime, playground.common.ballConst.options)
        console.info('addMobile',data,balls);
        document.getElementById('infos').innerHTML += '<li id="'+data.id+'" style="color:'+balls[data.id].getColor()+'"><span>toto</span></li>';
    }
    
    function removeMobile(data){
        console.info('removeMobile>',data,balls);
        delete balls[data.id];
        var elem = document.getElementById(data.id);
        elem.parentNode.removeChild(elem);
        console.info('>removeMobile',data,balls);
    }
    
    function updateMotionInfos(mobiles){
//        console.info('updateMotionInfos');
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
        ball.move(ball.inputX*DEVICEMOTION_INPUT_RATIO,-ball.inputY*DEVICEMOTION_INPUT_RATIO);
        ball.manageStageBorderCollision(width, height);
    }
    
    /**
     * @see http://stackoverflow.com/questions/6748781/looping-javascript-hashmap#6748870
     * for looping through hashmap like an array
     */
    function manageCollisions(){
        var i,j,keys,ii;
        for (i = 0, keys = Object.keys(balls), ii = keys.length; i < ii; i++) {
            for (j = i+1; j < ii; j++){
                if(balls[keys[i]].checkBallCollision(balls[keys[j]]) === true){
                    balls[keys[i]].resolveBallCollision(balls[keys[j]]);
                }
            }
        }
    }
    
    function prepareCanvas(){
        var el = document.getElementById('playground');
        width   = el.width = playground.common.stage.width;
        height  = el.height = playground.common.stage.height;
        ctx = el.getContext('2d');
    }
    
    function clearAllContext(){
        ctx.clearRect ( 0 , 0 , width , height );
    }
    
    function renderInfos(){
        for(var id in balls){
            document.getElementById(id).innerHTML = '<span>inputX : '+balls[id].inputX+' - inputY : '+balls[id].inputY+'</span>';
        }
    }
    
    function renderScreen(){
        clearAllContext();
        for(var id in balls){
            balls[id].draw(ctx);
        }
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