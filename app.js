/* ==========================================================================
   JS Application Logic - Redesigned Digital Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Application Components ---
    initTheme();
    initSceneRouter();
    initDirectoryExplorer();
    initCraapTable();
    initLightbox();
    initKanbanDragDrop();
    initTeacherFeedback();
    initRevealOnScroll();
});

// ==========================================================================
// 1. THEME CONTROLLER (Dark / Light Mode)
// ==========================================================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
    
    const darkIcon = themeBtn.querySelector('.theme-icon-dark');
    const lightIcon = themeBtn.querySelector('.theme-icon-light');

    // Retrieve saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIcon) lightIcon.style.display = 'block';
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        if (darkIcon) darkIcon.style.display = 'block';
        if (lightIcon) lightIcon.style.display = 'none';
    }

    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme', !isLight);
        
        if (isLight) {
            localStorage.setItem('portfolio-theme', 'light');
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'block';
            showToast('Đã chuyển sang giao diện Sáng ☀️', 'success');
        } else {
            localStorage.setItem('portfolio-theme', 'dark');
            if (darkIcon) darkIcon.style.display = 'block';
            if (lightIcon) lightIcon.style.display = 'none';
            showToast('Đã chuyển sang giao diện Tối 🌙', 'success');
        }
    });
}

// ==========================================================================
// 2. SCENE ROUTER (Handles tab/section switching as separate visual scenes)
// ==========================================================================
function initSceneRouter() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    if (sections.length === 0 || navLinks.length === 0) return;

    function switchScene(hash) {
        // Fallback to '#gioi-thieu' if hash is empty or not in our expected set
        const validHashes = ['#gioi-thieu', '#du-an', '#tong-ket'];
        const activeHash = validHashes.includes(hash) ? hash : '#gioi-thieu';
        
        // Update URL hash without jumping if hash was empty initially
        if (!window.location.hash || !validHashes.includes(window.location.hash)) {
            history.replaceState(null, null, activeHash);
        }

        // Toggle active class on sections for the 3D-scale fade transition
        sections.forEach(section => {
            if ('#' + section.id === activeHash) {
                section.classList.add('active-scene');
            } else {
                section.classList.remove('active-scene');
            }
        });

        // Toggle active class on nav links
        navLinks.forEach(link => {
            if (link.getAttribute('href') === activeHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll back to top immediately when scene transitions
        window.scrollTo(0, 0);
    }

    // Listen to hash change for browser navigation (back/forward)
    window.addEventListener('hashchange', () => {
        switchScene(window.location.hash);
    });

    // Initialize the route on page load
    switchScene(window.location.hash);
}

// ==========================================================================
// 3. INTERACTIVE DIRECTORY TREE EXPLORER (Bài 1)
// ==========================================================================
function initDirectoryExplorer() {
    const folderNodes = document.querySelectorAll('.tree-node.folder');
    
    folderNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering parent folder click
            
            const isClosed = node.classList.toggle('closed');
            node.classList.toggle('open', !isClosed);
            
            // Toggle Folder Icon
            const iconSvg = node.querySelector('.icon');
            if (isClosed) {
                // Change SVG to folder closed
                iconSvg.innerHTML = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
            } else {
                // Change SVG to folder open
                iconSvg.innerHTML = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M2 10h20"/></svg>';
            }
        });
    });
}

// ==========================================================================
// 4. CRAAP CRITERIA INTERACTIVE ROWS (Bài 2)
// ==========================================================================
function initCraapTable() {
    const rows = document.querySelectorAll('.clickable-row');
    const explanations = {
        'c1': '🕒 Cách kiểm chứng Currency (Tính cập nhật): Kiểm tra ngày xuất bản cuối cùng, kiểm tra lịch sử chỉnh sửa (revision history) nếu là tài liệu trực tuyến, và xác minh xem các đường link tham chiếu trong bài có bị lỗi 404 (chết link) hay không.',
        'c2': '🎯 Cách kiểm chứng Relevance (Sự liên quan): Đọc nhanh phần Tóm tắt (Abstract) và Kết luận (Conclusion). Xác định xem tài liệu có giải quyết đúng khía cạnh hẹp của đề tài nghiên cứu không, hay chỉ đề cập chung chung.',
        'c3': '👤 Cách kiểm chứng Authority (Tác giả/Uy tín): Tra cứu hồ sơ khoa học của tác giả trên Google Scholar hoặc ResearchGate. Kiểm tra xem cơ quan chủ quản (Đại học/Viện nghiên cứu) có uy tín trong ngành không.',
        'c4': '✅ Cách kiểm chứng Accuracy (Độ chính xác): Đối chiếu số liệu thực nghiệm với các nghiên cứu khác. Kiểm tra xem bài viết có trải qua quy trình phản biện kín (peer-reviewed) của ban biên tập khoa học hay không.',
        'c5': '💡 Cách kiểm chứng Purpose (Mục đích): Xác định xem bài nghiên cứu nhằm mục đích giáo dục khoa học khách quan hay được tài trợ quảng cáo bởi doanh nghiệp thương mại có mục đích tiếp thị.'
    };

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const criterion = row.getAttribute('data-criterion');
            const message = explanations[criterion];
            if (message) {
                showToast(message, 'success');
            }
        });
    });
}

// ==========================================================================
// 5. KANBAN KÉO THẢ VÀ DI CHUYỂN THẺ (Bài 4)
// ==========================================================================
function initKanbanDragDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-column');
    
    // Drag & Drop Web API
    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            updateKanbanButtons(card);
        });
    });

    columns.forEach(col => {
        col.addEventListener('dragover', (e) => {
            e.preventDefault();
            const cardsContainer = col.querySelector('.kanban-cards');
            const draggingCard = document.querySelector('.dragging');
            if (draggingCard) {
                cardsContainer.appendChild(draggingCard);
            }
        });
    });
}

// Global Move Card function (for buttons - mobile friendly)
window.moveCard = function(cardId, targetColId) {
    const card = document.getElementById(cardId);
    const targetCol = document.getElementById(targetColId);
    
    if (card && targetCol) {
        const cardsContainer = targetCol.querySelector('.kanban-cards');
        cardsContainer.appendChild(card);
        
        // Add a scale-up pop animation to card on move
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);

        updateKanbanButtons(card, targetColId);
        showToast(`Đã chuyển thẻ tới cột ${targetCol.querySelector('.column-header').innerText}!`, 'success');
    }
};

// Update movement button destinations based on column
function updateKanbanButtons(card, currentColId = '') {
    const btn = card.querySelector('.btn-move');
    if (!btn) return;

    const parentCol = currentColId || card.parentElement.parentElement.id;

    if (parentCol === 'col-todo') {
        btn.setAttribute('onclick', `moveCard('${card.id}', 'col-doing')`);
        btn.innerHTML = '➡';
    } else if (parentCol === 'col-doing') {
        btn.setAttribute('onclick', `moveCard('${card.id}', 'col-done')`);
        btn.innerHTML = '➡';
    } else if (parentCol === 'col-done') {
        btn.setAttribute('onclick', `moveCard('${card.id}', 'col-todo')`);
        btn.innerHTML = '🔄';
    }
}

// ==========================================================================
// 6. IMAGE LIGHTBOX SYSTEM (Bài 5)
// ==========================================================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggerImg = document.getElementById('eco-city-img');

    if (triggerImg) {
        triggerImg.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = triggerImg.src;
            lightboxCaption.innerHTML = '<strong>Đô thị sinh thái xanh tương lai</strong> - Sản phẩm đồng sáng tạo giữa tư duy ý tưởng của con người và năng lực tạo sinh đồ họa của AI.';
        });
    }

    function closeLightbox() {
        if (lightbox) lightbox.style.display = 'none';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close on click outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// ==========================================================================
// 7. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // SVG Success check icon
    toast.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove toast after 4.5s (includes animation time)
    setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);
}

// ==========================================================================
// 8. LECTURER FEEDBACK CONTROLLER
// ==========================================================================
function initTeacherFeedback() {
    const btnToggle = document.getElementById('btn-toggle-feedback');
    const inputArea = document.getElementById('feedback-input-area');
    const btnSubmit = document.getElementById('btn-submit-feedback');
    const btnCancel = document.getElementById('btn-cancel-feedback');
    const txtArea = document.getElementById('feedback-textarea');
    const reviewText = document.getElementById('teacher-review-text');

    if (!btnToggle || !reviewText) return;

    // Load saved review if exists
    const savedFeedback = localStorage.getItem('portfolio-teacher-feedback');
    if (savedFeedback) {
        reviewText.innerHTML = `<em>"${savedFeedback}"</em>`;
    }

    btnToggle.addEventListener('click', () => {
        if (inputArea) inputArea.classList.remove('hidden');
        btnToggle.classList.add('hidden');
        // Pre-fill text area with current text without quotes
        const currentText = reviewText.innerText.replace(/^"|"$/g, '');
        txtArea.value = currentText === 'Chưa có đánh giá nào từ Giảng viên.' ? '' : currentText;
        txtArea.focus();
    });

    btnCancel.addEventListener('click', () => {
        if (inputArea) inputArea.classList.add('hidden');
        btnToggle.classList.remove('hidden');
    });

    btnSubmit.addEventListener('click', () => {
        const feedbackVal = txtArea.value.trim();
        if (!feedbackVal) {
            showToast('Vui lòng nhập nội dung nhận xét!', 'error');
            return;
        }

        reviewText.innerHTML = `<em>"${feedbackVal}"</em>`;
        localStorage.setItem('portfolio-teacher-feedback', feedbackVal);
        
        if (inputArea) inputArea.classList.add('hidden');
        btnToggle.classList.remove('hidden');
        showToast('Đã đăng tải đánh giá của giảng viên thành công!', 'success');
    });
}

// ==========================================================================
// 9. REVEAL ANIMATIONS ON SCROLL & SCENE TRANSITION
// ==========================================================================
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 80;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    
    // Reset and trigger reveal animation when hash changes (scene transition)
    window.addEventListener('hashchange', () => {
        reveals.forEach(el => el.classList.remove('visible'));
        setTimeout(checkReveal, 200); // Trigger after scene entrance scale/slide transition
    });
    
    // Trigger once on initial load with a slight delay
    setTimeout(checkReveal, 200);
}
