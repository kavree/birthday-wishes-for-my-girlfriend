document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    let isOpen = false;

    // Add sparkle effect
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        envelopeWrapper.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Create sparkles periodically
    setInterval(createSparkle, 300);

    // Handle envelope click
    envelopeWrapper.addEventListener('click', () => {
        if (!isOpen) {
            envelope.classList.add('open');
            isOpen = true;
        }
    });

    // Add hover effect
    envelopeWrapper.addEventListener('mouseenter', () => {
        if (!isOpen) {
            envelope.style.transform = 'scale(1.05)';
        }
    });

    envelopeWrapper.addEventListener('mouseleave', () => {
        if (!isOpen) {
            envelope.style.transform = 'scale(1)';
        }
    });
}); 