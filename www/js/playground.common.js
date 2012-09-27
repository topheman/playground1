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
       hostname : '192.168.211.52',
       port : '8000'
//       hostname : 'localhost',
//       port : '8000'
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
    
    return {
        isRemoteTiltEnabled : isRemoteTiltEnabled,
        getRandomColor : getRandomColor,
        environnement : env
    }
    
})()

//for node.js
if (typeof module !== 'undefined') {
    module.exports = playground.common;
}