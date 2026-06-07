/* ==========================================================================
   DIGITAL PORTFOLIO JAVASCRIPT - NGUYEN DUY HUNG
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. NAVIGATION LOGIC & TAB SWITCHING
    // ----------------------------------------------------
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.page-section');

    function switchSection(targetId) {
        // Deactivate all sections and menu items
        sections.forEach(sec => sec.classList.remove('active'));
        menuItems.forEach(item => item.classList.remove('active'));

        // Activate target section
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
            targetSec.classList.add('active');
            
            // Sync with sidebar menu item
            const matchingMenu = document.querySelector(`.menu-item[data-target="${targetId}"]`);
            if (matchingMenu) {
                matchingMenu.classList.add('active');
            }

            // Trigger animations based on section
            if (targetId === 'sec-intro') {
                animateSkillsBars();
            }
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            switchSection(target);
            // On mobile, scroll to top when changing section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Skill progress bars animation
    function animateSkillsBars() {
        const skillBars = document.querySelectorAll('.skill-bar-inner');
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // Initialize first animation
    animateSkillsBars();


    // ----------------------------------------------------
    // 2. THEME SWITCHING (LIGHT / DARK)
    // ----------------------------------------------------
    const themeBtn = document.getElementById('theme-toggle-btn');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Sun SVG Icon
    const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    // Moon SVG Icon
    const moonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    function toggleTheme() {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        
        // Update both toggle button icons
        if (themeIcon) {
            themeIcon.innerHTML = isLight ? sunSvg : moonSvg;
        }
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.innerHTML = sunSvg;
    } else {
        if (themeIcon) themeIcon.innerHTML = moonSvg;
    }


    // ----------------------------------------------------
    // 3. TOAST NOTIFICATION UTILITY
    // ----------------------------------------------------
    const toast = document.getElementById('toast-notif');
    
    function showToast(message) {
        if (toast) {
            const span = toast.querySelector('span');
            if (span) span.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }


    // ----------------------------------------------------
    // 4. TUAN 1: INTERACTIVE FILE TREE & VIEWER
    // ----------------------------------------------------
    const fileItems = {
        'CNS_Baitap1_NguyenDuyHung_v1.0.pdf': {
            type: 'pdf',
            title: 'CNS_Baitap1_NguyenDuyHung_v1.0.pdf',
            desc: 'Tài liệu báo cáo thực hành Bài 1 - Thao tác tệp tin và thiết lập cấu trúc thư mục khoa học trên ổ đĩa Windows.'
        },
        'CNS_Baitap2_NguyenDuyHung_v1.2.xlsx': {
            type: 'xlsx',
            title: 'CNS_Baitap2_NguyenDuyHung_v1.2.xlsx',
            desc: 'Bảng tính dữ liệu chi tiết thống kê và chấm điểm độ tin cậy của các nguồn học thuật phục vụ Bài tập 2.'
        },
        'CNS_Baitap3_NguyenDuyHung_v1.0.docx': {
            type: 'docx',
            title: 'CNS_Baitap3_NguyenDuyHung_v1.0.docx',
            desc: 'Báo cáo Bài tập 3 - Tổng hợp kết quả phản hồi và kỹ thuật Prompt Engineering với trợ lý ảo Google Gemini.'
        },
        'Dhung_bai3.png': {
            type: 'image',
            title: 'Ảnh chụp minh họa Google Gemini (Bài 3)',
            desc: 'Giao diện tương tác thực tế với trợ lý ảo Gemini, thực hiện câu lệnh Prompt nâng cao cấu trúc CREATE.',
            src: 'assets/Dhung_bai3.png'
        },
        'Dhung_bai4.png': {
            type: 'image',
            title: 'Ảnh chụp bảng Trello Kanban (Bài 4)',
            desc: 'Bảng Kanban trực tuyến phân chia nhiệm vụ và theo dõi tiến độ của nhóm dự án CLB Kỹ năng mềm.',
            src: 'assets/Dhung_bai4.png'
        },
        'Dhung_bai5_1.png': {
            type: 'image',
            title: 'Ảnh chụp Infographic Sáng tạo AI (Bài 5)',
            desc: 'Ấn phẩm truyền thông dạng Infographic quảng bá chiến dịch du lịch bền vững được đồng sáng tạo bởi AI.',
            src: 'assets/Dhung_bai5_1.png'
        },
        'Dhung_bai5_2.png': {
            type: 'image',
            title: 'Ảnh chụp Concept Art Đô thị xanh (Bài 5)',
            desc: 'Hình ảnh đô thị sinh thái xanh trong tương lai được sinh bởi công cụ đồ họa trí tuệ nhân tạo Midjourney.',
            src: 'assets/Dhung_bai5_2.png'
        }
    };

    const activeImg = document.getElementById('active-screenshot-img');
    const activeTitle = document.getElementById('active-screenshot-title');
    const activeDesc = document.getElementById('active-screenshot-desc');
    const viewerPlaceholder = document.getElementById('viewer-placeholder');
    const viewerDisplay = document.getElementById('viewer-display');
    const zoomImgContainer = document.getElementById('zoom-img-container');

    function activateFileNode(fileName) {
        const item = fileItems[fileName];
        if (!item) return;

        if (viewerPlaceholder && viewerDisplay && activeTitle && activeDesc) {
            viewerPlaceholder.style.display = 'none';
            viewerDisplay.style.display = 'flex';
            
            activeTitle.textContent = item.title;
            activeDesc.textContent = item.desc;

            if (item.type === 'image') {
                if (zoomImgContainer) zoomImgContainer.style.display = 'flex';
                if (activeImg) {
                    activeImg.style.display = 'block';
                    activeImg.src = item.src;
                }
            } else {
                if (zoomImgContainer) zoomImgContainer.style.display = 'none';
                if (activeImg) activeImg.style.display = 'none';
            }
        }
    }

    // Toggle File Tree Folders
    const folders = document.querySelectorAll('.tree-folder > .node-label');
    folders.forEach(folder => {
        folder.addEventListener('click', (e) => {
            const parentNode = folder.parentElement;
            parentNode.classList.toggle('expanded');
            e.stopPropagation();
        });
    });

    // File node clicks in tree
    const fileNodes = document.querySelectorAll('.tree-file');
    fileNodes.forEach(file => {
        file.addEventListener('click', (e) => {
            document.querySelectorAll('.node-label').forEach(n => n.classList.remove('active'));
            file.querySelector('.node-label').classList.add('active');
            
            const fileName = file.getAttribute('data-filename');
            activateFileNode(fileName);
            e.stopPropagation();
        });
    });

    // Lightbox modal logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCap = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    function openLightbox(src, caption) {
        if (lightboxModal && lightboxImg && lightboxCap) {
            lightboxImg.src = src;
            lightboxCap.textContent = caption;
            lightboxModal.style.display = 'flex';
        }
    }

    if (zoomImgContainer) {
        zoomImgContainer.addEventListener('click', () => {
            if (activeImg && activeImg.style.display !== 'none') {
                openLightbox(activeImg.src, activeTitle.textContent);
            }
        });
    }

    // Hook up other infographics for zoom lightbox
    const t5Infographic = document.getElementById('infographic-t5-wrap');
    if (t5Infographic) {
        t5Infographic.addEventListener('click', () => {
            const img = t5Infographic.querySelector('img');
            if (img) openLightbox(img.src, "Infographic: Quy trình sáng tạo nội dung du lịch bền vững");
        });
    }

    const t6Infographic = document.getElementById('infographic-t6-wrap');
    if (t6Infographic) {
        t6Infographic.addEventListener('click', () => {
            const img = t6Infographic.querySelector('img');
            if (img) openLightbox(img.src, "Infographic: Quy tắc sử dụng AI có trách nhiệm trong học tập");
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            if (lightboxModal) lightboxModal.style.display = 'none';
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }


    // ----------------------------------------------------
    // 5. TUAN 2: RENDER SOURCES TABLE & COPY CITATIONS
    // ----------------------------------------------------
    const t2Sources = [
        { stt: 1, author: "Baker, R.S. (2021)", type: "Bài báo khoa học / OECD", title: "AI in Education: Implications for the curriculum and teacher training", desc: "Tác giả thuộc Đại học Pennsylvania; phương pháp nghiên cứu rõ ràng; đánh giá tác động của AI trong giáo dục; độ tin cậy rất cao.", score: "5/5", rating: "Rất cao", citation: "Baker, R.S. (2021) 'AI in Education: Implications for the curriculum and teacher training', OECD Education Working Papers, No. 247, OECD Publishing, Paris." },
        { stt: 2, author: "Du Boulay, B. (2019)", type: "Tạp chí khoa học / IEEE", title: "Artificial Intelligence as a Classroom Assistant: Opportunities and Risks", desc: "Giáo sư nổi tiếng về AI và giáo dục tại Đại học Sussex; nội dung tập trung phân tích AI hỗ trợ giảng viên; phân tích đa chiều; độ tin cậy rất cao.", score: "5/5", rating: "Rất cao", citation: "Du Boulay, B. (2019) 'Artificial Intelligence as a Classroom Assistant: Opportunities and Risks', IEEE Intelligent Systems, 34(5), pp. 3-8." },
        { stt: 3, author: "Holmes & Tuomi (2022)", type: "Tạp chí khoa học / European Journal", title: "State of the art of AI in Education", desc: "Bài viết tổng quan hệ thống từ các chuyên gia hàng đầu; phương pháp luận nghiên cứu nghiêm túc; độ tin cậy rất cao.", score: "5/5", rating: "Rất cao", citation: "Holmes, W. and Tuomi, I. (2022) 'State of the art of AI in Education', European Journal of Education, 57(4), pp. 542-570." },
        { stt: 4, author: "Luckin, R. (2020)", type: "Sách chuyên khảo / UCL Press", title: "Machine Learning and Human Intelligence: The future of education in the 21st century", desc: "Sách từ nhà xuất bản Đại học UCL uy tín; phân tích chuyên sâu về học máy và trí tuệ con người; độ tin cậy cao.", score: "4/5", rating: "Cao", citation: "Luckin, R. (2020) Machine Learning and Human Intelligence: The future of education in the 21st century. London: UCL Press." },
        { stt: 5, author: "UNESCO (2021)", type: "Nguồn mở / Báo cáo chính sách", title: "AI and education: guidance for policy-makers", desc: "Tài liệu chính sách từ tổ chức quốc tế lớn; có tính khách quan cao nhưng chủ yếu mang tính định hướng chính sách chung.", score: "4/5", rating: "Cao", citation: "UNESCO (2021) AI and education: guidance for policy-makers. Paris: UNESCO." }
    ];

    const sourcesTableBody = document.querySelector('#tuan2-sources-table tbody');
    if (sourcesTableBody) {
        t2Sources.forEach(src => {
            const tr = document.createElement('tr');
            
            const isVeryHigh = src.rating === 'Rất cao';
            const badgeClass = isVeryHigh ? 'very-high' : 'high';
            
            tr.innerHTML = `
                <td style="text-align: center; font-weight: 700; color: var(--text-muted);">${src.stt}</td>
                <td>
                    <strong style="color: var(--text-main); font-size: 0.9rem;">${src.author}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; margin-top: 0.2rem;">${src.title}</div>
                </td>
                <td><span style="font-size: 0.75rem; font-weight: 600; color: var(--primary);">${src.type}</span></td>
                <td style="color: var(--text-muted); font-size: 0.8rem;">${src.desc}</td>
                <td style="text-align: center;"><span class="score-badge">${src.score}</span></td>
                <td style="text-align: center;"><span class="rank-badge ${badgeClass}">${src.rating}</span></td>
                <td style="text-align: center;">
                    <button class="cite-btn" data-citation="${src.citation}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        Copy
                    </button>
                </td>
            `;
            sourcesTableBody.appendChild(tr);
        });

        // Copy Citation Event Listeners
        const copyBtns = document.querySelectorAll('.cite-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const textToCopy = btn.getAttribute('data-citation');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast("Đã sao chép trích dẫn Harvard!");
                }).catch(err => {
                    console.error('Lỗi khi sao chép: ', err);
                });
            });
        });
    }

    // CRAAP criteria rows alert
    const rows = document.querySelectorAll('.clickable-row');
    const explanations = {
        'c1': '🕒 Cách kiểm chứng Currency (Tính cập nhật): Kiểm tra ngày xuất bản cuối cùng, kiểm tra lịch sử chỉnh sửa nếu là tài liệu trực tuyến, và xác minh xem các đường link tham chiếu trong bài có bị lỗi hay không.',
        'c2': '🎯 Cách kiểm chứng Relevance (Sự liên quan): Đọc nhanh phần Tóm tắt (Abstract) và Kết luận (Conclusion). Xác định xem tài liệu có giải quyết đúng khía cạnh hẹp của đề tài nghiên cứu không.',
        'c3': '👤 Cách kiểm chứng Authority (Tác giả/Uy tín): Tra cứu hồ sơ khoa học của tác giả trên Google Scholar hoặc ResearchGate. Kiểm tra xem cơ quan chủ quản (Đại học/Viện nghiên cứu) có uy tín trong ngành không.',
        'c4': '✅ Cách kiểm chứng Accuracy (Độ chính xác): Đối chiếu số liệu thực nghiệm với các nghiên cứu khác. Kiểm tra xem bài viết có trải qua quy trình phản biện kín (peer-reviewed) hay không.',
        'c5': '💡 Cách kiểm chứng Purpose (Mục đích): Xác định xem bài nghiên cứu nhằm mục đích giáo dục khoa học khách quan hay được tài trợ bởi doanh nghiệp thương mại có mục đích tiếp thị.'
    };

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const criterion = row.getAttribute('data-criterion');
            const message = explanations[criterion];
            if (message) {
                showToast(message);
            }
        });
    });


    // ----------------------------------------------------
    // 6. TUAN 3: IDE CODE VIEW & SOURCE CODES
    // ----------------------------------------------------
    const promptTemplate = `[Role]: Bạn là một giảng viên xuất sắc ngành Mạng máy tính.
[Context]: Em đang ôn thi môn Mạng máy tính cuối kỳ và cần nắm rõ kiến thức cốt lõi của mô hình OSI.
[Task]: Hãy lập bảng so sánh chi tiết chức năng, giao thức cốt lõi của từng tầng trong mô hình 7 tầng OSI.
[Constraint]: Trình bày gọn gàng, sử dụng ví dụ đời thực cho mỗi tầng để dễ nhớ. Giải thích bằng tiếng Việt dễ hiểu cho sinh viên năm nhất.`;

    const blockchainAnalogy = `# Giải thích Blockchain (Ẩn dụ từ AI)

Mạng lưới Blockchain giống như một **Cuốn sổ cái dùng chung của một ngôi làng**:
1. **Phân tán**: Mỗi người dân trong làng đều giữ một bản sao của cuốn sổ cái này.
2. **Khối (Block)**: Mỗi trang sách ghi lại danh sách các giao dịch chuyển tiền.
3. **Chuỗi (Chain)**: Các trang sách được đánh số thứ tự liên kết chặt chẽ bằng mật mã.
4. **Đồng thuận**: Khi có giao dịch mới, cả làng phải đồng ý mới được ghi vào sổ.
5. **Bất biến**: Không ai có thể lén tẩy xóa vì mọi người sẽ đối chiếu với bản sao của họ.`;

    // Helper to format/escape HTML inside code blocks
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    const pyBlock = document.getElementById('code-python');
    const texBlock = document.getElementById('code-latex');

    if (pyBlock && texBlock) {
        let formattedPy = escapeHtml(promptTemplate);
        // Highlight square brackets
        formattedPy = formattedPy.replace(/(\[.*?\])/g, '<span class="code-keyword">$1</span>');
        pyBlock.innerHTML = formattedPy;

        let formattedTex = escapeHtml(blockchainAnalogy);
        // Highlight headings and numbers
        formattedTex = formattedTex.replace(/^(#.*)/gm, '<span class="code-class">$1</span>');
        formattedTex = formattedTex.replace(/^(\d+\.)/gm, '<span class="code-number">$1</span>');
        formattedTex = formattedTex.replace(/(\*\*.*?\*\*)/g, '<span class="code-keyword">$1</span>');
        texBlock.innerHTML = formattedTex;
    }

    // Code Tab switching
    const codeTabBtns = document.querySelectorAll('.tuan3-tab-btn');
    const editorFilename = document.getElementById('editor-filename');
    const codeBlocks = document.querySelectorAll('.code-block');

    codeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetType = btn.getAttribute('data-code');
            
            codeTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            codeBlocks.forEach(block => block.classList.remove('active'));
            
            if (targetType === 'python') {
                if (pyBlock) pyBlock.classList.add('active');
                if (editorFilename) editorFilename.textContent = 'prompt_template.txt';
            } else {
                if (texBlock) texBlock.classList.add('active');
                if (editorFilename) editorFilename.textContent = 'blockchain_analogy.md';
            }
        });
    });

    // Code Copy Event Listener
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const activeBlock = document.querySelector('.code-block.active');
            if (activeBlock) {
                navigator.clipboard.writeText(activeBlock.innerText).then(() => {
                    showToast("Đã sao chép mã nguồn vào bộ nhớ đệm!");
                }).catch(err => {
                    console.error('Lỗi sao chép: ', err);
                });
            }
        });
    }


    // ----------------------------------------------------
    // 7. TUAN 4: KANBAN BOARD & TIMELINE
    // ----------------------------------------------------
    const kanbanTasks = [
        { id: 1, title: "Tìm kiếm 5 tài liệu uy tín", col: "done", role: "Trưởng nhóm", tags: ["pm"], desc: "Thu thập tài liệu .edu và đánh giá theo chuẩn CRAAP phục vụ cho bài nghiên cứu lộ trình học tập AI." },
        { id: 2, title: "Thiết kế Slide thuyết trình", col: "done", role: "Teammate 2", tags: ["pm"], desc: "Thiết kế slide theo phong cách tối giản trên Canva để cả nhóm chuẩn bị thuyết trình." },
        { id: 3, title: "Tổng hợp viết nội dung Word", col: "done", role: "Teammate 1", tags: ["content"], desc: "Viết phần nội dung báo cáo chương 4 và kiểm tra đạo văn." },
        { id: 4, title: "Tạo Thư mục OneDrive nhóm", col: "done", role: "Duy Hùng", tags: ["storage"], desc: "Khởi tạo cấu trúc thư mục nhóm và chia sẻ quyền chỉnh sửa OneDrive." },
        { id: 5, title: "Viết báo cáo cá nhân", col: "doing", role: "Duy Hùng", tags: ["content"], desc: "Tự đánh giá hiệu quả và lập minh chứng quá trình phối hợp của cá nhân." },
        { id: 6, title: "Tối ưu hóa file nén báo cáo", col: "todo", role: "Duy Hùng", tags: ["storage"], desc: "Nén toàn bộ thư mục bài tập Tuần 4 sang dạng ZIP và kiểm tra dung lượng." }
    ];

    const timelineDays = [
        { day: 1, title: "Ngày 1: Họp Khởi Động", content: "Cả nhóm họp online thống nhất chủ đề 'Lập kế hoạch truyền thông CLB Kỹ năng mềm'. Phân công nhiệm vụ cụ thể và liên kết Trello, OneDrive." },
        { day: 2, title: "Ngày 2: Thiết lập quản lý", content: "Duy Hùng tạo các thẻ công việc trên bảng Trello và thiết lập cây thư mục học tập dùng chung trên OneDrive." },
        { day: 3, title: "Ngày 3: Soạn thảo nội dung", content: "Tiến hành viết phần Nhu cầu thực tế của sinh viên và các tính năng chính lên Google Docs. Hỏi ý kiến nhóm qua Slack/Discord." },
        { day: 4, title: "Ngày 4: Nhận góp ý & Chỉnh sửa", content: "Nhóm phản hồi bài viết trên Docs. Duy Hùng chỉnh sửa trực tiếp, chuyển trạng thái thẻ Trello sang Review." },
        { day: 5, title: "Ngày 5: Tổ chức tài nguyên", content: "Rà soát toàn bộ tệp trên OneDrive, thực hiện đổi tên file không dấu đồng bộ và cấu hình quyền truy cập." },
        { day: 6, title: "Ngày 6: Hoàn tất nhiệm vụ", content: "Nghiệm thu phần thuyết trình Slide Canva, Duy Hùng chuyển thẻ việc Trello sang Done và xuất ảnh minh chứng." },
        { day: 7, title: "Ngày 7: Hoàn thiện báo cáo", content: "Tự đánh giá hiệu suất phối hợp, viết báo cáo cá nhân tuần 4 và hoàn thiện gói tài nguyên nộp bài." }
    ];

    const kanbanBoardContainer = document.getElementById('kanban-board-container');
    const kanbanModal = document.getElementById('kanban-modal');
    const kCloseBtn = document.getElementById('kanban-close-btn');
    const kModalTitle = document.getElementById('k-modal-title');
    const kModalCol = document.getElementById('k-modal-col');
    const kModalRole = document.getElementById('k-modal-role');
    const kModalDesc = document.getElementById('k-modal-desc');

    function renderKanban() {
        if (!kanbanBoardContainer) return;
        kanbanBoardContainer.innerHTML = '';
        
        const columns = [
            { id: "todo", title: "Cần làm", class: "todo" },
            { id: "doing", title: "Đang làm", class: "doing" },
            { id: "review", title: "Kiểm tra", class: "review" },
            { id: "done", title: "Hoàn thành", class: "done" }
        ];

        columns.forEach(col => {
            const colDiv = document.createElement('div');
            colDiv.className = 'kanban-col';
            colDiv.id = `kanban-col-${col.id}`;
            
            const colTasks = kanbanTasks.filter(t => t.col === col.id);
            
            colDiv.innerHTML = `
                <div class="kanban-col-header">
                    <span class="kanban-col-title">${col.title}</span>
                    <span class="kanban-col-count">${colTasks.length}</span>
                </div>
                <div class="kanban-cards" id="cards-${col.id}"></div>
            `;
            kanbanBoardContainer.appendChild(colDiv);
            
            const cardsContainer = colDiv.querySelector(`#cards-${col.id}`);
            colTasks.forEach(task => {
                const card = document.createElement('div');
                card.className = 'kanban-card';
                
                // Assignee initial letter
                const initial = task.role ? task.role[0] : 'U';

                card.innerHTML = `
                    <div class="kanban-card-tags">
                        ${task.tags.map(t => `<span class="kanban-tag ${t}">${t.toUpperCase()}</span>`).join('')}
                    </div>
                    <div class="kanban-card-title">${task.title}</div>
                    <div class="kanban-card-footer">
                        <span style="font-size: 0.7rem;">Giao: <strong>${task.role}</strong></span>
                        <div class="kanban-card-assignee">${initial}</div>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    openKanbanCard(task);
                });
                
                cardsContainer.appendChild(card);
            });
        });
    }

    // Initial render
    renderKanban();

    // Global move card function (interactive buttons on card could also do this)
    window.moveCard = function(cardIdStr, targetColId) {
        // Find by id (we have task id 1 to 6)
        const idNum = parseInt(cardIdStr.replace('card-', ''), 10);
        const task = kanbanTasks.find(t => t.id === idNum);
        const colId = targetColId.replace('col-', '');
        if (task) {
            task.col = colId;
            renderKanban();
            showToast(`Đã chuyển thẻ tới cột ${colId.toUpperCase()}!`);
        }
    };

    function openKanbanCard(task) {
        if (kanbanModal && kModalTitle && kModalCol && kModalRole && kModalDesc) {
            kModalTitle.textContent = task.title;
            
            let statusText = "Hoàn thành";
            if (task.col === 'todo') statusText = 'Cần làm';
            if (task.col === 'doing') statusText = 'Đang làm';
            if (task.col === 'review') statusText = 'Kiểm tra';
            
            kModalCol.textContent = statusText;
            kModalRole.textContent = task.role;
            kModalDesc.textContent = task.desc;
            kanbanModal.style.display = 'flex';
        }
    }

    if (kCloseBtn) {
        kCloseBtn.addEventListener('click', () => {
            if (kanbanModal) kanbanModal.style.display = 'none';
        });
    }

    if (kanbanModal) {
        kanbanModal.addEventListener('click', (e) => {
            if (e.target === kanbanModal) {
                kanbanModal.style.display = 'none';
            }
        });
    }

    // Timeline logic
    const timelineMilestones = document.getElementById('timeline-milestones');
    const progressBar = document.getElementById('timeline-progress-bar');
    const tlTitle = document.getElementById('timeline-title');
    const tlContent = document.getElementById('timeline-content');

    if (timelineMilestones) {
        timelineDays.forEach((dayData, index) => {
            const milestone = document.createElement('div');
            milestone.className = `timeline-item ${index === 0 ? 'active' : ''}`;
            milestone.setAttribute('data-day', dayData.day);
            milestone.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-label">N${dayData.day}</div>
            `;
            
            milestone.addEventListener('click', () => {
                document.querySelectorAll('.timeline-item').forEach(m => m.classList.remove('active'));
                milestone.classList.add('active');
                
                // Update detail text
                if (tlTitle) tlTitle.textContent = dayData.title;
                if (tlContent) tlContent.textContent = dayData.content;
                
                // Update progress bar width
                const progressWidth = (index / (timelineDays.length - 1)) * 100;
                if (progressBar) progressBar.style.width = `${progressWidth}%`;
            });
            
            timelineMilestones.appendChild(milestone);
        });

        // Initialize progress bar at 0%
        if (progressBar) progressBar.style.width = '0%';
    }


    // ----------------------------------------------------
    // 8. TUAN 5: TEACHER FEEDBACK SYSTEM
    // ----------------------------------------------------
    const btnToggle = document.getElementById('btn-toggle-feedback');
    const inputArea = document.getElementById('feedback-input-area');
    const btnSubmit = document.getElementById('btn-submit-feedback');
    const btnCancel = document.getElementById('btn-cancel-feedback');
    const txtArea = document.getElementById('feedback-textarea');
    const reviewText = document.getElementById('teacher-review-text');

    if (btnToggle && reviewText) {
        // Load saved review if exists
        const savedFeedback = localStorage.getItem('portfolio-teacher-feedback');
        if (savedFeedback) {
            reviewText.innerHTML = `<em>"${savedFeedback}"</em>`;
        }

        btnToggle.addEventListener('click', () => {
            if (inputArea) inputArea.classList.remove('hidden');
            btnToggle.classList.add('hidden');
            const currentText = reviewText.innerText.replace(/^"|"$/g, '');
            txtArea.value = currentText === 'Chưa có đánh giá nào từ Giảng viên.' ? '' : currentText;
            txtArea.focus();
        });

        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                if (inputArea) inputArea.classList.add('hidden');
                btnToggle.classList.remove('hidden');
            });
        }

        if (btnSubmit) {
            btnSubmit.addEventListener('click', () => {
                const feedbackVal = txtArea.value.trim();
                if (!feedbackVal) {
                    showToast('Vui lòng nhập nội dung nhận xét!');
                    return;
                }

                reviewText.innerHTML = `<em>"${feedbackVal}"</em>`;
                localStorage.setItem('portfolio-teacher-feedback', feedbackVal);
                
                if (inputArea) inputArea.classList.add('hidden');
                btnToggle.classList.remove('hidden');
                showToast('Đã đăng tải đánh giá của giảng viên thành công!');
            });
        }
    }


    // ----------------------------------------------------
    // 9. TUAN 6: POLICIES SWITCH & ETHICS CHECKBOXES
    // ----------------------------------------------------
    const policyTabBtns = document.querySelectorAll('.policy-tab-btn');
    const policyContents = document.querySelectorAll('.policy-content');

    policyTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPolicy = btn.getAttribute('data-policy');
            
            policyTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            policyContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `policy-${targetPolicy}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Checklist logic
    const rulesCheckboxes = document.querySelectorAll('.rules-checklist input[type="checkbox"]');
    const integrityBadgeContainer = document.getElementById('integrity-badge-container');

    rulesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const li = checkbox.closest('li');
            if (checkbox.checked) {
                if (li) li.classList.add('checked');
            } else {
                if (li) li.classList.remove('checked');
            }

            // Check if all are checked
            const allChecked = Array.from(rulesCheckboxes).every(cb => cb.checked);
            if (allChecked) {
                if (integrityBadgeContainer) integrityBadgeContainer.classList.add('show');
                showToast("Cảm ơn sự cam kết liêm chính học thuật của bạn!");
            } else {
                if (integrityBadgeContainer) integrityBadgeContainer.classList.remove('show');
            }
        });
    });

});
