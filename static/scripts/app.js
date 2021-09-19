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
