document.addEventListener('DOMContentLoaded', function() {
    const loanFrames = document.querySelectorAll('.loan-frame');
    const contentWrappers = document.querySelectorAll('.content-wrapper');
    const frameContents = {
        vehicle: document.getElementById('vehicle'),
        gold: document.getElementById('gold'),
        business: document.getElementById('business'),
        cd: document.getElementById('cd')
    };
    
    function updateContent(loanType) {
        // Hide all content wrappers
        contentWrappers.forEach(wrapper => {
            wrapper.style.display = 'none';
        });
        
        // Show the selected content wrapper
        const selectedContent = document.querySelector(`.content-wrapper[data-loan="${loanType}"]`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            
            // Animate the content
            selectedContent.style.opacity = '0';
            selectedContent.style.transform = 'translateY(20px)';
            
            // Trigger reflow
            selectedContent.offsetHeight;
            
            // Add animation
            selectedContent.style.transition = 'all 0.5s ease';
            selectedContent.style.opacity = '1';
            selectedContent.style.transform = 'translateY(0)';
        }

        // Update frame contents visibility
        Object.keys(frameContents).forEach(key => {
            if (frameContents[key]) {
                if (key === loanType) {
                    frameContents[key].classList.add('active');
                } else {
                    frameContents[key].classList.remove('active');
                }
            }
        });
    }
    
    loanFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            // Remove active class from all frames
            loanFrames.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked frame
            this.classList.add('active');
            
            // Update content based on selected loan type
            const loanType = this.getAttribute('data-loan');
            updateContent(loanType);
        });
    });

    // Set initial state
    const activeFrame = document.querySelector('.loan-frame.active');
    if (activeFrame) {
        const initialLoanType = activeFrame.getAttribute('data-loan');
        updateContent(initialLoanType);
    }
}); 