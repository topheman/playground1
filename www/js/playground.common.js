/**
 * To avoid reference errors if no console object in scope
 */
if(typeof console == 'undefined'){
    var console = {
        warn: function(){},
        log:  function(){},
        info: function(){}
    }
}

playground = {};

playground.common = (function(){
    
    var env = {
//        hostname : '192.168.211.52',
        hostname : '192.168.1.10',
        port : '8000'
    //       hostname : 'localhost',
    //       port : '8000'
    }
    
    var stage = {
        width : 600,
        height : 500
    }
    
    var ballConst = {
        radius           : 15,
        mass             : 1.3,
        gravity          : 1,
        elasticity       : 0.98,
        friction         : 0.94,
        lifetime         : Infinity,
        options          : {
            aging:true,
            bouncingColor:'#000060',
            bouncingRate: 20,
            glowingColor:'#9922DD',
            glowingRate:'#9922DD',
            explodingRadius:80,
            explodingRate:40,
            explodingAlpha:true
        }
    }
    
    /**
     * @return {Boolean}
     */
    function isRemoteTiltEnabled(){
        if(window.location.href.indexOf('#tiltremote') > -1)
            return true;
        else
            return false;
    }
    
    /**
     * Return random hexa code color
     * @return string 
     */
    function getRandomColor(){
        var color = '#000000';
        while(color == '#000000'){
            color = '#'+Math.floor(Math.random()*16777215).toString(16);
        }
        return color;
    }
    
    /**
     * From Ball.js - Ball.prototype.setRandomPositionAndSpeedInBounds
     */
    function getRandomPositionAndSpeedInBounds(){
        return {
            x : Math.random()*stage.width,
            y : Math.random()*stage.height,
            velocityX : Math.random()*10,
            velocityY : Math.random()*10
        }
    }
    
    return {
        isRemoteTiltEnabled : isRemoteTiltEnabled,
        getRandomColor : getRandomColor,
        environnement : env,
        stage : stage,
        getRandomPositionAndSpeedInBounds : getRandomPositionAndSpeedInBounds,
        ballConst : ballConst
    }
    
})()

//for node.js
if (typeof module !== 'undefined') {
    module.exports = playground.common;
}