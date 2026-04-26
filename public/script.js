document.getElementById('sendBtn').addEventListener('click', async () => {
    const inputField = document.getElementById('messageInput');
    const responseOutput = document.getElementById('responseOutput');
    const videoContainer = document.getElementById('videoContainer');
    const myVideo = document.getElementById('myVideo');
    
    const messageText = inputField.value;

    if (!messageText) {
        responseOutput.textContent = "Please enter the captcha.";
        return;
    }

    responseOutput.textContent = "Checking captcha...";

    try {
        const response = await fetch('/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText }) 
        });

        const data = await response.json();
        responseOutput.textContent = data.reply;

        if (data.action === 'play_video') {
            document.body.innerHTML = '';
            const fullContainer = document.createElement('div');
            fullContainer.className = 'fullscreen-video';
            const iframe = document.createElement('iframe');
            iframe.src = data.videoUrl;
            iframe.allow = "autoplay; encrypted-media; fullscreen";
            iframe.setAttribute('allowfullscreen', '');
            fullContainer.appendChild(iframe);
            document.body.appendChild(fullContainer);
            if (fullContainer.requestFullscreen) {
                fullContainer.requestFullscreen();}
           
        } else {
            videoContainer.style.display = 'none';
            myVideo.src = ""; 
        }
        
        inputField.value = '';

    } catch (error) {
        console.error("Error:", error);
        responseOutput.textContent = "Error connecting to the server.";
    }
});