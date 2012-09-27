playground.mobile = (function(){
    
    var inputX = 0,
    inputY = 0,socket
    ;
    
    function isDeviceMotionEnabled(){
        if(window.DeviceMotionEvent)
            return true;
        else
            return false;
    }
    
    function isWebSocketsEnabled(){
        if(window.WebSocket)
            return true;
        else
            return false;
    }

    function checkFeatures(){
        var errors = "";
        if(!isDeviceMotionEnabled())
            errors += "<li>No gyroscope detected.</li>";
        if(!isWebSocketsEnabled())
            errors += "<li>No websockets enabled.</li>";
        if(errors != ""){
            document.getElementById("errors").innerHTML = "<h3>Errors</h3><ul>"+errors+"</ul>";
            return false;
        }
        else
            return true;
    }

    function init(){
        //do not execute on remotetilt frame
        if(playground.common.isRemoteTiltEnabled())
            return;
        //do not execute if all the features needed aren't here
        if(!checkFeatures())
            return;
        //listen to the orientation of the device
        window.addEventListener("devicemotion", function(event){
            inputX = event.accelerationIncludingGravity.x;
            inputY = event.accelerationIncludingGravity.y;
        }, false);
        //update the coordinates on the screen
        updateCoordinates();
        //push coordinates to server via socket.io
        socketConnect(pushMotionInfos);
    }

    function updateCoordinates(){
        document.getElementById("coords").innerHTML = "inputX : "+inputX+" - inputY : "+inputY;
        window.requestAnimFrame(updateCoordinates);
    }
    
    function socketConnect(callback){
        socket = io.connect('http://'+playground.common.environnement.hostname+':'+playground.common.environnement.port);
        socket.on('who-is-there', function(data){
            socket.emit('mobile-connect',{});
        });
        socket.on('mobile-connected',function(data){
            console.log('mobile connected',data);
//            log(data.socketId);
            document.getElementById('ball').style.backgroundColor = data.color;
            callback();
        });
    }
    
    function pushMotionInfos(){
        console.info('pushMotionInfos');
        socket.emit('mobile-infos',{
            inputX: inputX,
            inputY: inputY
        });
        window.requestAnimFrame(pushMotionInfos);
    }

    function log(msg){
        document.getElementById('errors').innerHTML += msg;
    }
    
    return {
        init : init
    }
    
})()