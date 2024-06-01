window.onload = function() {
    const audio = new Audio('music.mp3');
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');

    audio.crossOrigin = "anonymous"; // to prevent CORS issues
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        requestAnimationFrame(draw);
    
        analyser.getByteFrequencyData(dataArray);
    
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
    
        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
    
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    
            x += document.querySelector('.viza').getBoundingClientRect().width / 255 - 2;
        }
    }

        audio.play(); // начать воспроизведение при нажатии на кнопку
        draw(); // запустить визуализатор
};
