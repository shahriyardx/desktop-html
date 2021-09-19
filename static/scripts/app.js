(function(){
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then(response => response.text())
        .then(data => {
            data = data.trim().split('\n').reduce(function(obj, pair) {
                pair = pair.split('=');
                return obj[pair[0]] = pair[1], obj;
              }, {});
              
              let ip = data.ip
              fetch(`https://ipinfo.io/${ip}/json`)
                .then(response => response.json())
                .then(data => {
                    lat = data.loc.split(',')[0]
                    lon = data.loc.split(',')[1]

                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=05a4361b638235a33d86f51b86f279c2`)
                        .then(response => response.json())
                        .then(data => {
                            temp = parseInt(data.main.temp)
                            city = data.name
                            condition = data.weather[0].main
                            
                            weather = document.querySelector('.weather')

                            if (weather) {
                                weather.querySelector('.location').textContent = city
                                weather.querySelector('.temp').textContent = temp
                                weather.querySelector('.condition').textContent = condition
                            }
                        })
                })
        })
    
    

    function current_time() {
        date = new Date()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? `0${minutes}`: minutes
        hours = hours < 10 ? `0${hours}`: hours
        month = date.toLocaleString('default', { month: 'short' });
        day = date.getDate()

        return [`${hours}:${minutes}`, ampm, `${month} ${day}`]
    }

    setInterval(() => {
        ctime = current_time()
        time = ctime[0]
        ampm = ctime[1]
        date = ctime[2]

        document.querySelector('.clock .time').textContent = time
        document.querySelector('.clock .ampm').textContent = ampm
        document.querySelector('.date span').textContent = date
        
    }, 1000);


    document.querySelector('.toggler').addEventListener('click', e => {
        document.querySelector('.screen .apps').classList.toggle('active')
        e.target.classList.toggle('active')
    })

})();