const canvas = document.getElementById('roadmap');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');

// Level data
let levels = [
    { x: 300, y: 720, level: 1, unlocked: true, completed: true, stars: 3 },
    { x: 180, y: 620, level: 2, unlocked: true, completed: true, stars: 2 },
    { x: 420, y: 520, level: 3, unlocked: true, completed: false, stars: 0 },
    { x: 220, y: 420, level: 4, unlocked: false, completed: false, stars: 0 },
    { x: 450, y: 320, level: 5, unlocked: false, completed: false, stars: 0 },
    { x: 180, y: 220, level: 6, unlocked: false, completed: false, stars: 0 },
    { x: 380, y: 120, level: 7, unlocked: false, completed: false, stars: 0 }
];

let hoveredLevel = null;
let selectedLevel = null;

// Draw the path connecting levels
function drawPath() {
    // Background path (gray)
    ctx.strokeStyle = '#d0d0d0';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(levels[0].x, levels[0].y);
    
    for (let i = 1; i < levels.length; i++) {
        ctx.lineTo(levels[i].x, levels[i].y);
    }
    
    ctx.stroke();

    // Unlocked path (green)
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 12;
    
    ctx.beginPath();
    ctx.moveTo(levels[0].x, levels[0].y);
    
    for (let i = 1; i < levels.length; i++) {
        if (levels[i].unlocked) {
            ctx.lineTo(levels[i].x, levels[i].y);
        } else {
            break;
        }
    }
    
    ctx.stroke();
}

// Draw a star
function drawStar(x, y, size) {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? size : size / 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
}

// Draw stars above level
function drawStars(level) {
    if (level.completed && level.stars > 0) {
        const startX = level.x - (level.stars - 1) * 12;
        const y = level.y - 50;
        for (let i = 0; i < level.stars; i++) {
            drawStar(startX + i * 24, y, 8);
        }
    }
}

// Draw a single level node
function drawLevel(level) {
    const radius = 35;
    const isHovered = hoveredLevel === level.level;
    const isSelected = selectedLevel === level.level;
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = isHovered ? 15 : 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    
    // Circle
    ctx.beginPath();
    ctx.arc(level.x, level.y, radius + (isHovered ? 5 : 0), 0, Math.PI * 2);
    
    if (!level.unlocked) {
        ctx.fillStyle = '#9ca3af';
    } else if (level.completed) {
        ctx.fillStyle = '#fbbf24';
    } else {
        ctx.fillStyle = '#60a5fa';
    }
    
    ctx.fill();
    
    // Border
    if (isSelected) {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Lock icon for locked levels
    if (!level.unlocked) {
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', level.x, level.y);
    } else {
        // Level number
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(level.level, level.x, level.y);
    }
    
    // Draw stars
    drawStars(level);
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPath();
    levels.forEach(level => drawLevel(level));
}

// Get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Check if mouse is over a level
function getLevelAtPos(x, y) {
    for (let level of levels) {
        const distance = Math.sqrt((x - level.x) ** 2 + (y - level.y) ** 2);
        if (distance < 35) {
            return level;
        }
    }
    return null;
}

// Mouse move handler
canvas.addEventListener('mousemove', (e) => {
    const pos = getMousePos(e);
    const level = getLevelAtPos(pos.x, pos.y);
    
    if (level) {
        hoveredLevel = level.level;
        canvas.style.cursor = level.unlocked ? 'pointer' : 'not-allowed';
        
        if (level.unlocked) {
            if (level.completed) {
                info.textContent = `Level ${level.level} - Completed with ${level.stars} stars! ⭐`;
            } else {
                info.textContent = `Level ${level.level} - Ready to play!`;
            }
        } else {
            info.textContent = `Level ${level.level} - Locked 🔒`;
        }
    } else {
        hoveredLevel = null;
        canvas.style.cursor = 'default';
        info.textContent = 'Hover over levels to see info. Click unlocked levels to play!';
    }
    
    draw();
});

// Mouse click handler
canvas.addEventListener('click', (e) => {
    const pos = getMousePos(e);
    const level = getLevelAtPos(pos.x, pos.y);
    
    if (level && level.unlocked) {
        selectedLevel = level.level;
        info.textContent = `🎮 Starting Level ${level.level}...`;
        draw();
    }
});

// Control functions
function unlockNext() {
    for (let level of levels) {
        if (!level.unlocked) {
            level.unlocked = true;
            info.textContent = `Level ${level.level} unlocked! 🎉`;
            draw();
            return;
        }
    }
    info.textContent = 'All levels already unlocked!';
}

function completeSelected() {
    if (selectedLevel) {
        const level = levels.find(l => l.level === selectedLevel);
        if (level && !level.completed) {
            level.completed = true;
            level.stars = Math.floor(Math.random() * 3) + 1;
            info.textContent = `Level ${level.level} completed with ${level.stars} stars! ⭐`;
            draw();
        }
    } else {
        info.textContent = 'Select a level first!';
    }
}

function reset() {
    levels.forEach((level, i) => {
        level.unlocked = i < 3;
        level.completed = i < 2;
        level.stars = i < 2 ? (i === 0 ? 3 : 2) : 0;
    });
    selectedLevel = null;
    hoveredLevel = null;
    info.textContent = 'Reset complete!';
    draw();
}

// Initial draw
draw();