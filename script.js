document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Modal functionality
    const modalButtons = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar transparency effect on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0,0,0,0.9)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)';
        }
    });
    
    // Create random pixel decorations for the footer
    createPixelDecorations();
});

// Function to create random pixel decorations
function createPixelDecorations() {
    const footer = document.querySelector('footer');
    const pixelCount = 15;
    
    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel-decoration');
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 3;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        pixel.style.top = `${top}%`;
        pixel.style.left = `${left}%`;
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.opacity = opacity;
        
        footer.appendChild(pixel);
    }
}

// Comment submission
const commentForms = document.querySelectorAll('.comment-form');

commentForms.forEach(form => {
    const submitBtn = form.querySelector('.comment-submit');
    const input = form.querySelector('.comment-input');
    const commentsContainer = form.closest('.meme-comments');
    
    submitBtn.addEventListener('click', function() {
        if (input.value.trim() !== '') {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            const now = new Date();
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-author">You</div>
                    <div class="comment-date">Just now</div>
                </div>
                <div class="comment-content">${input.value}</div>
            `;
            
            commentsContainer.insertBefore(newComment, form);
            
            // Update comment count
            const memeCard = commentsContainer.closest('.meme-card');
            const commentCount = memeCard.querySelector('.comment-count');
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
            
            input.value = '';
        }
    });
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
});

// Share functionality
const shareButtons = document.querySelectorAll('.share-btn');
const shareModal = document.querySelector('.share-modal');
const closeShareBtn = document.querySelector('.close-share');
const shareUrl = document.getElementById('share-url');
const copyLinkBtn = document.getElementById('copy-link');
let currentMemeTitle = '';

shareButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        currentMemeTitle = this.getAttribute('data-title');
        const memeCard = this.closest('.meme-card');
        const memeImg = memeCard.querySelector('.meme-image').src;
        
        // Generate a shareable URL (in a real app, this would be a unique URL)
        const shareableUrl = `${window.location.origin}/meme?title=${encodeURIComponent(currentMemeTitle)}&img=${encodeURIComponent(memeImg)}`;
        shareUrl.textContent = shareableUrl;
        
        shareModal.classList.add('active');
    });
});

if (closeShareBtn) {
    closeShareBtn.addEventListener('click', function() {
        shareModal.classList.remove('active');
    });
}

// Copy link functionality
if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function() {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl.textContent;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show copied feedback
        this.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

// Social media sharing
document.getElementById('share-facebook').addEventListener('click', function() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.textContent)}`, '_blank');
});

document.getElementById('share-twitter').addEventListener('click', function() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this physics meme: ' + currentMemeTitle)}&url=${encodeURIComponent(shareUrl.textContent)}`, '_blank');
});

document.getElementById('share-whatsapp').addEventListener('click', function() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this physics meme: ' + currentMemeTitle + ' ' + shareUrl.textContent)}`, '_blank');
});

document.getElementById('share-telegram').addEventListener('click', function() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl.textContent)}&text=${encodeURIComponent('Check out this physics meme: ' + currentMemeTitle)}`, '_blank');
});

document.getElementById('share-email').addEventListener('click', function() {
    window.location.href = `mailto:?subject=${encodeURIComponent('Check out this physics meme')}&body=${encodeURIComponent('I found this funny physics meme: ' + currentMemeTitle + '\n\n' + shareUrl.textContent)}`;
});

// Upload functionality
const uploadBtn = document.querySelector('.upload-btn');
const uploadModal = document.querySelector('.upload-modal');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.btn-cancel');
const submitBtn = document.querySelector('.btn-submit');
const memeTitle = document.getElementById('meme-title');
const memeDescription = document.getElementById('meme-description');
const fileInput = document.querySelector('input[type="file"]');
const fileName = document.querySelector('.file-name');
const memesFeed = document.querySelector('.memes-feed');

if (uploadBtn && uploadModal) {
    uploadBtn.addEventListener('click', function() {
        uploadModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        uploadModal.classList.remove('active');
    });
    
    cancelBtn.addEventListener('click', function() {
        uploadModal.classList.remove('active');
        resetUploadForm();
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
    
    submitBtn.addEventListener('click', function() {
        if (validateUploadForm()) {
            uploadMeme();
        }
    });
}

function validateUploadForm() {
    let isValid = true;
    
    if (!memeTitle.value.trim()) {
        alert('Please enter a title for your meme');
        isValid = false;
    }
    
    if (!memeDescription.value.trim()) {
        alert('Please enter a description for your meme');
        isValid = false;
    }
    
    // File is now optional - removed the validation check for file
    
    return isValid;
}

function uploadMeme() {
    // In a real app, this would send data to a server
    // For this demo, we'll just add it to the page
    
    // Create new meme card
    const newMeme = document.createElement('div');
    newMeme.className = 'meme-card';
    
    // Get current date
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Check if there's an image file
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            createMemeCard(newMeme, formattedDate, imageUrl);
        };
        
        reader.readAsDataURL(file);
    } else {
        // Create a text-only meme
        createMemeCard(newMeme, formattedDate);
    }
}

function createMemeCard(newMeme, formattedDate, imageUrl = null) {
    // Create meme HTML with or without image
    let memeContent = '';
    
    if (imageUrl) {
        memeContent = `
            <img src="${imageUrl}" alt="Physics Meme" class="meme-image">
            <h3 class="meme-title">${memeTitle.value}</h3>
            <p class="meme-description">${memeDescription.value}</p>
        `;
    } else {
        // Text-only meme with styled background
        memeContent = `
            <div class="text-only-meme">
                <h3 class="meme-title">${memeTitle.value}</h3>
                <p class="meme-description">${memeDescription.value}</p>
            </div>
        `;
    }
    
    newMeme.innerHTML = `
        <div class="meme-header">
            <div class="meme-author">You</div>
            <div class="meme-date">${formattedDate}</div>
        </div>
        <div class="meme-content">
            ${memeContent}
        </div>
        <div class="meme-actions">
            <div class="meme-action upvote-btn">
                <i class="fas fa-arrow-up"></i>
                <span class="upvote-count">0</span>
            </div>
            <div class="meme-action comment-btn">
                <i class="fas fa-comment"></i>
                <span class="comment-count">0</span>
            </div>
            <div class="meme-action share-btn" data-title="${memeTitle.value}">
                <i class="fas fa-share"></i>
                <span>Share</span>
            </div>
        </div>
        <div class="meme-comments">
            <div class="comment-form">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <button class="comment-submit"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    // Add the new meme to the top of the feed
    memesFeed.insertBefore(newMeme, memesFeed.firstChild);
    
    // Close modal and reset form
    uploadModal.classList.remove('active');
    resetUploadForm();
    
    // Add event listeners to new elements
    const newUpvoteBtn = newMeme.querySelector('.upvote-btn');
    const newCommentBtn = newMeme.querySelector('.comment-btn');
    const newShareBtn = newMeme.querySelector('.share-btn');
    const newCommentForm = newMeme.querySelector('.comment-form');
    
    newUpvoteBtn.addEventListener('click', function() {
        this.classList.toggle('upvoted');
        const countElement = this.querySelector('.upvote-count');
        let count = parseInt(countElement.textContent);
        
        if (this.classList.contains('upvoted')) {
            countElement.textContent = count + 1;
        } else {
            countElement.textContent = count - 1;
        }
    });
    
    newCommentBtn.addEventListener('click', function() {
        const commentsSection = newMeme.querySelector('.meme-comments');
        commentsSection.classList.toggle('active');
    });
    
    newShareBtn.addEventListener('click', function() {
        currentMemeTitle = this.getAttribute('data-title');
        const memeImg = newMeme.querySelector('.meme-image')?.src || '';
        
        const shareableUrl = `${window.location.origin}/meme?title=${encodeURIComponent(currentMemeTitle)}&text=${encodeURIComponent(memeDescription.value)}`;
        shareUrl.textContent = shareableUrl;
        
        shareModal.classList.add('active');
    });
    
    const submitBtn = newCommentForm.querySelector('.comment-submit');
    const input = newCommentForm.querySelector('.comment-input');
    const commentsContainer = newCommentForm.closest('.meme-comments');
    
    submitBtn.addEventListener('click', function() {
        if (input.value.trim() !== '') {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-author">You</div>
                    <div class="comment-date">Just now</div>
                </div>
                <div class="comment-content">${input.value}</div>
            `;
            
            commentsContainer.insertBefore(newComment, newCommentForm);
            
            const commentCount = newMeme.querySelector('.comment-count');
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
            
            input.value = '';
        }
    });
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Show success message
    alert('Your meme has been uploaded successfully!');
}

function resetUploadForm() {
    memeTitle.value = '';
    memeDescription.value = '';
    fileInput.value = '';
    fileName.textContent = 'No file chosen';
} 