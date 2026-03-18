/**
 * EchoRabbit 小红书卡片生成器 v2.0
 * 主应用逻辑 - 支持多卡片、画布缩放、面板折叠等功能
 */

// ========================================
// 画布配置
// ========================================
const CANVAS_CONFIG = {
  cardWidth: 1080,
  cardHeight: 1440,
  cardGap: 20,
  canvasPadding: 40,
  minZoom: 0.1,
  maxZoom: 2.0,
  defaultZoom: 'fit'
};

// ========================================
// 预设模板数据
// ========================================
const PRESET_TEMPLATES = {
  note: [
    {
      id: 'note-xhs-1',
      name: '小红书笔记-清新',
      type: 'note',
      style: 'xiaohongshu',
      background: { type: 'color', value: '#ffffff' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, scale: 1, maintainAspectRatio: false, content: '标题文字', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 48, fontWeight: 700, color: '#171717', textAlign: 'left', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 40, y: 140, width: 1000, height: 200, scale: 1, maintainAspectRatio: false, content: '在这里输入正文内容，分享你的生活点滴...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 400, color: '#404040', textAlign: 'left', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e3', type: 'text', x: 40, y: 1360, width: 1000, height: 40, scale: 1, maintainAspectRatio: false, content: '#标签 #小红书 #生活', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 20, fontWeight: 400, color: '#72e3ad', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } }
      ]
    }
  ],
  list: [
    {
      id: 'list-xhs-1',
      name: '清单攻略-步骤',
      type: 'list',
      style: 'xiaohongshu',
      background: { type: 'color', value: '#ffffff' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, scale: 1, maintainAspectRatio: false, content: '📋 必做清单', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 48, fontWeight: 700, color: '#171717', textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } }
      ]
    }
  ],
  quote: [
    {
      id: 'quote-xhs-1',
      name: '语录卡片-经典',
      type: 'quote',
      style: 'xiaohongshu',
      background: { type: 'color', value: '#171717' },
      elements: [
        { id: 'e1', type: 'text', x: 80, y: 400, width: 920, height: 400, scale: 1, maintainAspectRatio: false, content: '"生活不是等待风暴过去，而是学会在雨中翩翩起舞。"', style: { fontFamily: "'Noto Serif SC', serif", fontSize: 48, fontWeight: 600, color: '#ffffff', textAlign: 'center', lineHeight: 1.6, letterSpacing: 2, textDecoration: 'none' } }
      ]
    }
  ]
};

// ========================================
// 应用状态管理 v2.0
// ========================================
const AppState = {
  // 当前项目（多卡片）
  currentProject: null,
  
  // 当前选中的元素
  selectedElement: null,
  
  // 自定义模板
  customTemplates: [],
  
  // 批量数据
  batchData: [],
  
  // 拖拽状态
  isDragging: false,
  dragOffset: { x: 0, y: 0 },
  
  // 当前标签页
  currentTab: 'note',
  
  // 背景类型
  bgType: 'color',
  
  // 画布缩放
  canvasZoom: 0.5,
  
  // 面板折叠状态
  panelStates: {
    left: true,   // 左侧面板默认展开
    right: true,  // 右侧面板默认展开
    bottom: false // 底部面板默认折叠
  },
  
  // 导出设置
  exportConfig: {
    format: 'png',
    quality: 1,
    scale: 2,
    filenameFormat: 'index_name',
    customPrefix: '',
    includeReadme: false
  },
  
  // 初始化
  init() {
    this.loadCustomTemplates();
    this.loadBatchData();
    this.createNewProject();
  },
  
  // 创建新项目
  createNewProject() {
    this.currentProject = {
      id: 'proj_' + Date.now(),
      name: '未命名项目',
      cards: [],
      currentCardIndex: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    // 添加第一张卡片
    this.addCard();
  },
  
  // 添加新卡片
  addCard() {
    const card = {
      id: 'card_' + Date.now(),
      name: `第 ${this.currentProject.cards.length + 1} 页`,
      background: { 
        type: 'color', 
        value: '#ffffff',
        imageConfig: null
      },
      elements: [],
      order: this.currentProject.cards.length
    };
    this.currentProject.cards.push(card);
    this.currentProject.currentCardIndex = this.currentProject.cards.length - 1;
    return card;
  },
  
  // 获取当前卡片
  getCurrentCard() {
    if (!this.currentProject || this.currentProject.cards.length === 0) return null;
    return this.currentProject.cards[this.currentProject.currentCardIndex];
  },
  
  // 切换到指定卡片
  switchToCard(index) {
    if (index >= 0 && index < this.currentProject.cards.length) {
      this.currentProject.currentCardIndex = index;
      return true;
    }
    return false;
  },
  
  // 删除卡片
  deleteCard(index) {
    if (this.currentProject.cards.length <= 1) {
      alert('至少需要保留一张卡片');
      return false;
    }
    this.currentProject.cards.splice(index, 1);
    if (this.currentProject.currentCardIndex >= this.currentProject.cards.length) {
      this.currentProject.currentCardIndex = this.currentProject.cards.length - 1;
    }
    // 重新排序
    this.currentProject.cards.forEach((card, i) => {
      card.order = i;
      card.name = `第 ${i + 1} 页`;
    });
    return true;
  },
  
  // 加载自定义模板
  loadCustomTemplates() {
    try {
      const stored = localStorage.getItem('redbook_custom_templates');
      if (stored) {
        this.customTemplates = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load custom templates:', e);
      this.customTemplates = [];
    }
  },
  
  // 保存自定义模板
  saveCustomTemplates() {
    try {
      localStorage.setItem('redbook_custom_templates', JSON.stringify(this.customTemplates));
    } catch (e) {
      console.warn('Failed to save custom templates:', e);
    }
  },
  
  // 加载批量数据
  loadBatchData() {
    try {
      const stored = localStorage.getItem('redbook_batch_data');
      if (stored) {
        this.batchData = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load batch data:', e);
      this.batchData = [];
    }
  },
  
  // 保存批量数据
  saveBatchData() {
    try {
      localStorage.setItem('redbook_batch_data', JSON.stringify(this.batchData));
    } catch (e) {
      console.warn('Failed to save batch data:', e);
    }
  }
};

// ========================================
// DOM 元素引用
// ========================================
const DOM = {
  cardCanvas: null,
  canvasContainer: null,
  canvasWrapper: null,
  presetTemplates: null,
  customTemplates: null,
  templateTabs: null,
  elementProps: null,
  textStyleGroup: null,
  fontFamilyGroup: null,
  imageProps: null,
  bgColorGroup: null,
  bgGradientGroup: null,
  bgImageGroup: null,
  bgColor: null,
  bgGradientValue: null,
  textContent: null,
  fontFamily: null,
  fontSize: null,
  fontWeight: null,
  textColor: null,
  lineHeight: null,
  letterSpacing: null,
  posX: null,
  posY: null,
  elemWidth: null,
  elemHeight: null,
  rotation: null,
  rotationValue: null,
  batchSection: null,
  batchContent: null,
  batchTable: null,
  batchHeader: null,
  batchBody: null,
  exportModal: null,
  saveModal: null,
  // v2.0 新增
  cardNavigator: null,
  leftPanel: null,
  rightPanel: null,
  bottomPanel: null,
  
  init() {
    this.cardCanvas = document.getElementById('cardCanvas');
    this.canvasContainer = document.getElementById('canvasContainer');
    this.canvasWrapper = document.querySelector('.canvas-wrapper');
    this.presetTemplates = document.getElementById('presetTemplates');
    this.customTemplates = document.getElementById('customTemplates');
    this.templateTabs = document.querySelectorAll('.tab-btn');
    this.elementProps = document.getElementById('elementProps');
    this.textStyleGroup = document.getElementById('textStyleGroup');
    this.fontFamilyGroup = document.getElementById('fontFamilyGroup');
    this.imageProps = document.getElementById('imageProps');
    this.bgColorGroup = document.getElementById('bgColorGroup');
    this.bgGradientGroup = document.getElementById('bgGradientGroup');
    this.bgImageGroup = document.getElementById('bgImageGroup');
    this.bgColor = document.getElementById('bgColor');
    this.bgGradientValue = document.getElementById('bgGradientValue');
    this.textContent = document.getElementById('textContent');
    this.fontFamily = document.getElementById('fontFamily');
    this.fontSize = document.getElementById('fontSize');
    this.fontWeight = document.getElementById('fontWeight');
    this.textColor = document.getElementById('textColor');
    this.lineHeight = document.getElementById('lineHeight');
    this.letterSpacing = document.getElementById('letterSpacing');
    this.posX = document.getElementById('posX');
    this.posY = document.getElementById('posY');
    this.elemWidth = document.getElementById('elemWidth');
    this.elemHeight = document.getElementById('elemHeight');
    this.rotation = document.getElementById('rotation');
    this.rotationValue = document.getElementById('rotationValue');
    this.batchSection = document.getElementById('batchSection');
    this.batchContent = document.getElementById('batchContent');
    this.batchTable = document.getElementById('batchTable');
    this.batchHeader = document.getElementById('batchHeader');
    this.batchBody = document.getElementById('batchBody');
    this.exportModal = document.getElementById('exportModal');
    this.saveModal = document.getElementById('saveModal');
    // v2.0 新增
    this.cardNavigator = document.getElementById('cardNavigator');
    this.leftPanel = document.querySelector('.sidebar-left');
    this.rightPanel = document.querySelector('.sidebar-right');
    this.bottomPanel = document.querySelector('.batch-section');
  }
};

// ========================================
// 画布缩放管理 v2.0
// ========================================
const ZoomManager = {
  minZoom: CANVAS_CONFIG.minZoom,
  maxZoom: CANVAS_CONFIG.maxZoom,
  zoomStep: 0.1,
  
  setZoom(zoom) {
    zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    AppState.canvasZoom = zoom;
    
    // 使用 CanvasManager 的居中逻辑
    CanvasManager.centerCanvas();
    
    const zoomLevelEl = document.getElementById('zoomLevel');
    if (zoomLevelEl) {
      zoomLevelEl.textContent = Math.round(zoom * 100) + '%';
    }
    
    const canvasSizeEl = document.getElementById('canvasSize');
    if (canvasSizeEl) {
      canvasSizeEl.textContent = `${Math.round(CANVAS_CONFIG.cardWidth * zoom)} x ${Math.round(CANVAS_CONFIG.cardHeight * zoom)}`;
    }
  },
  
  zoomIn() {
    this.setZoom(AppState.canvasZoom + this.zoomStep);
  },
  
  zoomOut() {
    this.setZoom(AppState.canvasZoom - this.zoomStep);
  },
  
  zoomFit() {
    const wrapper = DOM.canvasWrapper;
    if (!wrapper) return;
    
    const wrapperRect = wrapper.getBoundingClientRect();
    const padding = CANVAS_CONFIG.canvasPadding * 2;
    
    const scaleX = (wrapperRect.width - padding) / CANVAS_CONFIG.cardWidth;
    const scaleY = (wrapperRect.height - padding) / CANVAS_CONFIG.cardHeight;
    const zoom = Math.min(scaleX, scaleY, 1);
    
    this.setZoom(Math.max(this.minZoom, zoom));
  },
  
  adjustContainer() {
    const zoom = AppState.canvasZoom;
    const width = CANVAS_CONFIG.cardWidth * zoom;
    const height = CANVAS_CONFIG.cardHeight * zoom;
    
    if (DOM.canvasContainer) {
      DOM.canvasContainer.style.minWidth = width + 'px';
      DOM.canvasContainer.style.minHeight = height + 'px';
    }
  },
  
  init() {
    // 初始化时自动适应
    setTimeout(() => this.zoomFit(), 100);
    
    // 绑定按钮事件
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomFitBtn = document.getElementById('zoomFit');
    
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomOut());
    if (zoomFitBtn) zoomFitBtn.addEventListener('click', () => this.zoomFit());
    
    // 鼠标滚轮缩放
    if (DOM.canvasContainer) {
      DOM.canvasContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          if (e.deltaY < 0) {
            this.zoomIn();
          } else {
            this.zoomOut();
          }
        }
      });
    }
    
    // 双击空白处自适应
    if (DOM.canvasContainer) {
      DOM.canvasContainer.addEventListener('dblclick', (e) => {
        if (e.target === DOM.canvasContainer) {
          this.zoomFit();
        }
      });
    }
    
    // 窗口大小改变时自适应
    window.addEventListener('resize', () => {
      setTimeout(() => this.zoomFit(), 100);
    });
  }
};

// ========================================
// 面板折叠管理 v2.0
// ========================================
const PanelManager = {
  togglePanel(panelName) {
    AppState.panelStates[panelName] = !AppState.panelStates[panelName];
    this.updatePanelUI(panelName);
  },
  
  updatePanelUI(panelName) {
    const isExpanded = AppState.panelStates[panelName];
    let panel, toggleBtn;
    
    switch(panelName) {
      case 'left':
        panel = DOM.leftPanel;
        toggleBtn = document.getElementById('toggleLeftPanel');
        break;
      case 'right':
        panel = DOM.rightPanel;
        toggleBtn = document.getElementById('toggleRightPanel');
        break;
      case 'bottom':
        panel = DOM.bottomPanel;
        toggleBtn = document.getElementById('toggleBottomPanel');
        break;
    }
    
    if (panel) {
      panel.classList.toggle('collapsed', !isExpanded);
    }
    
    if (toggleBtn) {
      toggleBtn.classList.toggle('collapsed', !isExpanded);
      // 更新箭头方向
      const svg = toggleBtn.querySelector('svg');
      if (svg) {
        if (panelName === 'left') {
          svg.innerHTML = isExpanded 
            ? '<polyline points="15 18 9 12 15 6"/>'
            : '<polyline points="9 18 15 12 9 6"/>';
        } else if (panelName === 'right') {
          svg.innerHTML = isExpanded 
            ? '<polyline points="9 18 15 12 9 6"/>'
            : '<polyline points="15 18 9 12 15 6"/>';
        }
      }
    }
    
    // 重新计算画布大小
    setTimeout(() => ZoomManager.zoomFit(), 300);
  },
  
  init() {
    // 初始化面板状态
    Object.keys(AppState.panelStates).forEach(panel => {
      this.updatePanelUI(panel);
    });
    
    // 绑定切换按钮
    const leftBtn = document.getElementById('toggleLeftPanel');
    const rightBtn = document.getElementById('toggleRightPanel');
    const bottomBtn = document.getElementById('toggleBottomPanel');
    
    if (leftBtn) leftBtn.addEventListener('click', () => this.togglePanel('left'));
    if (rightBtn) rightBtn.addEventListener('click', () => this.togglePanel('right'));
    if (bottomBtn) bottomBtn.addEventListener('click', () => this.togglePanel('bottom'));
  }
};

// ========================================
// 卡片导航管理 v2.0
// ========================================
const CardNavigator = {
  render() {
    if (!DOM.cardNavigator) return;
    
    const project = AppState.currentProject;
    if (!project || project.cards.length === 0) {
      DOM.cardNavigator.innerHTML = '';
      return;
    }
    
    const currentIndex = project.currentCardIndex;
    const totalCards = project.cards.length;
    
    DOM.cardNavigator.innerHTML = `
      <button class="btn btn-icon btn-sm" id="prevCard" ${currentIndex === 0 ? 'disabled' : ''}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <span class="card-indicator">${currentIndex + 1} / ${totalCards}</span>
      <button class="btn btn-icon btn-sm" id="nextCard" ${currentIndex === totalCards - 1 ? 'disabled' : ''}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <button class="btn btn-primary btn-sm" id="addCard">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        添加卡片
      </button>
    `;
    
    // 绑定事件
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    const addBtn = document.getElementById('addCard');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevCard());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextCard());
    if (addBtn) addBtn.addEventListener('click', () => this.addCard());
  },
  
  prevCard() {
    const newIndex = AppState.currentProject.currentCardIndex - 1;
    if (AppState.switchToCard(newIndex)) {
      CanvasManager.renderCanvas();
      this.render();
    }
  },
  
  nextCard() {
    const newIndex = AppState.currentProject.currentCardIndex + 1;
    if (AppState.switchToCard(newIndex)) {
      CanvasManager.renderCanvas();
      this.render();
    }
  },
  
  addCard() {
    AppState.addCard();
    CanvasManager.renderCanvas();
    this.render();
  },
  
  init() {
    this.render();
  }
};

// ========================================
// 画布管理
// ========================================
const CanvasManager = {
  renderCanvas() {
    const card = AppState.getCurrentCard();
    if (!card) return;
    
    // 设置背景
    this.applyBackground(card.background);
    
    // 清空现有元素
    DOM.cardCanvas.innerHTML = '';
    
    // 渲染元素
    card.elements.forEach(element => {
      this.createElementNode(element);
    });
    
    // 更新背景控制UI
    this.updateBackgroundUI(card.background);
    
    // 居中卡片
    this.centerCanvas();
  },
  
  centerCanvas() {
    if (!DOM.canvasContainer || !DOM.cardCanvas) return;
    
    const container = DOM.canvasContainer;
    const canvas = DOM.cardCanvas;
    const zoom = AppState.canvasZoom || 0.5;
    
    const canvasWidth = CANVAS_CONFIG.cardWidth * zoom;
    const canvasHeight = CANVAS_CONFIG.cardHeight * zoom;
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // 计算居中偏移
    const offsetX = Math.max(0, (containerWidth - canvasWidth) / 2);
    const offsetY = Math.max(0, (containerHeight - canvasHeight) / 2);
    
    // 应用变换：先平移到居中位置，再缩放
    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
    canvas.style.transformOrigin = 'top left';
  },
  
  applyBackground(background) {
    if (!background) return;
    
    if (background.type === 'color') {
      DOM.cardCanvas.style.background = background.value;
      DOM.cardCanvas.style.backgroundSize = '';
      DOM.cardCanvas.style.backgroundPosition = '';
    } else if (background.type === 'gradient') {
      DOM.cardCanvas.style.background = background.value;
      DOM.cardCanvas.style.backgroundSize = '';
      DOM.cardCanvas.style.backgroundPosition = '';
    } else if (background.type === 'image' && background.value) {
      const config = background.imageConfig || { fit: 'cover', position: 'center center', scale: 100 };
      
      DOM.cardCanvas.style.backgroundImage = `url(${background.value})`;
      DOM.cardCanvas.style.backgroundRepeat = 'no-repeat';
      
      // 应用适配模式
      if (config.fit === 'contain') {
        DOM.cardCanvas.style.backgroundSize = `${config.scale || 100}%`;
      } else {
        DOM.cardCanvas.style.backgroundSize = 'cover';
      }
      
      // 应用位置
      DOM.cardCanvas.style.backgroundPosition = config.position || 'center center';
    }
  },
  
  updateBackgroundUI(background) {
    if (!background) return;
    
    // 更新背景类型按钮
    document.querySelectorAll('[data-bg-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bgType === background.type);
    });
    
    // 显示/隐藏对应的设置组
    if (DOM.bgColorGroup) DOM.bgColorGroup.style.display = background.type === 'color' ? 'block' : 'none';
    if (DOM.bgGradientGroup) DOM.bgGradientGroup.style.display = background.type === 'gradient' ? 'block' : 'none';
    if (DOM.bgImageGroup) DOM.bgImageGroup.style.display = background.type === 'image' ? 'block' : 'none';
    
    // 更新具体值
    if (background.type === 'color' && DOM.bgColor) {
      DOM.bgColor.value = background.value;
    }
    
    if (background.type === 'image' && background.imageConfig) {
      const config = background.imageConfig;
      
      // 更新适配模式按钮
      document.querySelectorAll('[data-bg-fit]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.bgFit === (config.fit || 'cover'));
      });
      
      // 更新位置按钮
      document.querySelectorAll('.position-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.position === (config.position || 'center center'));
      });
      
      // 更新缩放滑块
      const bgScale = document.getElementById('bgScale');
      const bgScaleValue = document.getElementById('bgScaleValue');
      if (bgScale) bgScale.value = config.scale || 100;
      if (bgScaleValue) bgScaleValue.textContent = (config.scale || 100) + '%';
      
      // 显示/隐藏 contain 模式特有的控制
      const bgScaleGroup = document.getElementById('bgScaleGroup');
      if (bgScaleGroup) {
        bgScaleGroup.style.display = config.fit === 'contain' ? 'block' : 'none';
      }
    }
  },
  
  createElementNode(element) {
    const node = document.createElement('div');
    node.className = 'canvas-element';
    node.dataset.elementId = element.id;
    node.style.left = element.x + 'px';
    node.style.top = element.y + 'px';
    
    // 应用缩放
    const scale = element.scale || 1;
    node.style.width = (element.width * scale) + 'px';
    node.style.height = (element.height * scale) + 'px';
    node.style.zIndex = element.zIndex || 1;
    
    if (element.rotation) {
      node.style.transform = `rotate(${element.rotation}deg)`;
    }
    
    if (element.type === 'text') {
      node.classList.add('canvas-text');
      node.innerHTML = element.content.replace(/\n/g, '<br>');
      node.contentEditable = false;
      
      if (element.style) {
        Object.assign(node.style, {
          fontFamily: element.style.fontFamily,
          fontSize: element.style.fontSize + 'px',
          fontWeight: element.style.fontWeight,
          color: element.style.color,
          textAlign: element.style.textAlign,
          lineHeight: element.style.lineHeight,
          letterSpacing: element.style.letterSpacing + 'px',
          textDecoration: element.style.textDecoration
        });
      }
      
      node.addEventListener('dblclick', () => {
        node.contentEditable = true;
        node.focus();
      });
      
      node.addEventListener('blur', () => {
        node.contentEditable = false;
        element.content = node.innerText;
      });
    } else if (element.type === 'image' || element.type === 'sticker') {
      node.classList.add(element.type === 'image' ? 'canvas-image' : 'canvas-sticker');
      
      if (element.src) {
        const img = document.createElement('img');
        img.src = element.src;
        img.alt = element.type;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        node.appendChild(img);
        
        // 双击替换图片
        node.addEventListener('dblclick', () => {
          this.replaceImage(element);
        });
      } else {
        node.innerHTML = `<div style="width:100%;height:100%;background:linear-gradient(45deg,#f0f0f0 25%,transparent 25%,transparent 75%,#f0f0f0 75%,#f0f0f0),linear-gradient(45deg,#f0f0f0 25%,transparent 25%,transparent 75%,#f0f0f0 75%,#f0f0f0);background-size:20px 20px;background-position:0 0,10px 10px;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">${element.type === 'image' ? '图片' : '贴纸'}</div>`;
      }
    }
    
    // 添加调整手柄
    const handles = ['nw', 'ne', 'sw', 'se'];
    handles.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle ${pos}`;
      handle.dataset.handle = pos;
      node.appendChild(handle);
    });
    
    this.bindElementEvents(node, element);
    DOM.cardCanvas.appendChild(node);
    return node;
  },
  
  bindElementEvents(node, element) {
    node.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('resize-handle')) return;
      if (node.contentEditable === 'true') return;
      
      e.stopPropagation();
      e.preventDefault();
      this.selectElement(element);
      
      AppState.isDragging = true;
      AppState.draggedElement = element;
      const zoom = AppState.canvasZoom || 0.5;
      
      // 获取画布在视口中的位置
      const canvasRect = DOM.cardCanvas.getBoundingClientRect();
      
      // 计算相对于画布的鼠标位置
      const mouseX = (e.clientX - canvasRect.left) / zoom;
      const mouseY = (e.clientY - canvasRect.top) / zoom;
      
      AppState.dragOffset = {
        x: mouseX - element.x,
        y: mouseY - element.y
      };
    });
    
    node.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.startResize(e, element, handle.dataset.handle);
      });
    });
  },
  
  selectElement(element) {
    DOM.cardCanvas.querySelectorAll('.canvas-element').forEach(el => {
      el.classList.remove('selected');
    });
    
    AppState.selectedElement = element;
    
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) {
      node.classList.add('selected');
    }
    
    this.showElementProps(element);
  },
  
  showElementProps(element) {
    if (!DOM.elementProps) return;
    DOM.elementProps.style.display = 'block';
    
    const isText = element.type === 'text';
    const isImage = element.type === 'image' || element.type === 'sticker';
    
    if (DOM.textStyleGroup) DOM.textStyleGroup.style.display = isText ? 'block' : 'none';
    if (DOM.fontFamilyGroup) DOM.fontFamilyGroup.style.display = isText ? 'block' : 'none';
    if (DOM.imageProps) DOM.imageProps.style.display = isImage ? 'block' : 'none';
    
    if (isText && DOM.textContent) {
      DOM.textContent.value = element.content || '';
    }
    
    if (DOM.posX) DOM.posX.value = element.x;
    if (DOM.posY) DOM.posY.value = element.y;
    if (DOM.elemWidth) DOM.elemWidth.value = element.width;
    if (DOM.elemHeight) DOM.elemHeight.value = element.height;
    if (DOM.rotation) DOM.rotation.value = element.rotation || 0;
    if (DOM.rotationValue) DOM.rotationValue.textContent = (element.rotation || 0) + '°';
  },
  
  startResize(e, element, handle) {
    e.preventDefault();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;
    const startLeft = element.x;
    const startTop = element.y;
    const aspectRatio = startWidth / startHeight;
    
    const onMouseMove = (moveEvent) => {
      const zoom = AppState.canvasZoom || 0.5;
      const dx = (moveEvent.clientX - startX) / zoom;
      const dy = (moveEvent.clientY - startY) / zoom;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;
      
      if (handle.includes('e')) {
        newWidth = Math.max(50, startWidth + dx);
      }
      if (handle.includes('w')) {
        newWidth = Math.max(50, startWidth - dx);
        newX = startLeft + startWidth - newWidth;
      }
      if (handle.includes('s')) {
        newHeight = Math.max(50, startHeight + dy);
      }
      if (handle.includes('n')) {
        newHeight = Math.max(50, startHeight - dy);
        newY = startTop + startHeight - newHeight;
      }
      
      // 等比例缩放
      if (element.maintainAspectRatio) {
        if (Math.abs(dx) > Math.abs(dy)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }
      
      element.width = newWidth;
      element.height = newHeight;
      element.x = newX;
      element.y = newY;
      
      const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
      if (node) {
        node.style.width = newWidth + 'px';
        node.style.height = newHeight + 'px';
        node.style.left = newX + 'px';
        node.style.top = newY + 'px';
      }
      
      if (DOM.elemWidth) DOM.elemWidth.value = Math.round(newWidth);
      if (DOM.elemHeight) DOM.elemHeight.value = Math.round(newHeight);
      if (DOM.posX) DOM.posX.value = Math.round(newX);
      if (DOM.posY) DOM.posY.value = Math.round(newY);
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  },
  
  addElement(type) {
    const card = AppState.getCurrentCard();
    if (!card) return;
    
    // 图片和贴纸类型，先选择文件
    if (type === 'image' || type === 'sticker') {
      this.addImageElement(type);
      return;
    }
    
    // 文字元素，直接创建
    const id = 'e' + Date.now();
    const element = {
      id,
      type,
      x: 100,
      y: 100,
      width: 300,
      height: 100,
      scale: 1,
      rotation: 0,
      maintainAspectRatio: false,
      zIndex: card.elements.length + 1
    };
    
    if (type === 'text') {
      element.content = '新文本';
      element.style = {
        fontFamily: "'Noto Sans SC', sans-serif",
        fontSize: 24,
        fontWeight: 400,
        color: '#171717',
        textAlign: 'left',
        lineHeight: 1.5,
        letterSpacing: 0,
        textDecoration: 'none'
      };
    }
    
    card.elements.push(element);
    this.createElementNode(element);
    this.selectElement(element);
  },
  
  // 添加图片/贴纸元素（新机制）
  addImageElement(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 计算图片尺寸
          const dimensions = this.calculateImageDimensions(
            img.naturalWidth,
            img.naturalHeight
          );
          
          // 创建元素
          const card = AppState.getCurrentCard();
          const id = 'e' + Date.now();
          const element = {
            id,
            type,
            x: dimensions.x,
            y: dimensions.y,
            width: dimensions.width,
            height: dimensions.height,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight,
            scale: 1,
            rotation: 0,
            maintainAspectRatio: true,
            src: event.target.result,
            zIndex: card.elements.length + 1
          };
          
          card.elements.push(element);
          this.createElementNode(element);
          this.selectElement(element);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  },
  
  // 计算图片尺寸（等比缩放适配卡片）
  calculateImageDimensions(imgWidth, imgHeight) {
    const cardWidth = CANVAS_CONFIG.cardWidth;
    const cardHeight = CANVAS_CONFIG.cardHeight;
    
    let newWidth = imgWidth;
    let newHeight = imgHeight;
    
    // 如果图片大于卡片，需要等比缩放
    if (imgWidth > cardWidth || imgHeight > cardHeight) {
      const scaleX = cardWidth / imgWidth;
      const scaleY = cardHeight / imgHeight;
      const scale = Math.min(scaleX, scaleY, 1); // 最大缩放比例为1（不放大）
      
      newWidth = imgWidth * scale;
      newHeight = imgHeight * scale;
    }
    
    // 居中位置
    const x = (cardWidth - newWidth) / 2;
    const y = (cardHeight - newHeight) / 2;
    
    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      x: Math.round(x),
      y: Math.round(y)
    };
  },
  
  // 替换图片（双击图片时调用）
  replaceImage(element) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 更新图片源
          element.src = event.target.result;
          element.originalWidth = img.naturalWidth;
          element.originalHeight = img.naturalHeight;
          
          // 重新计算尺寸
          const dimensions = this.calculateImageDimensions(
            img.naturalWidth,
            img.naturalHeight
          );
          
          // 更新元素尺寸和位置
          element.width = dimensions.width;
          element.height = dimensions.height;
          element.x = dimensions.x;
          element.y = dimensions.y;
          
          // 重新渲染
          this.renderCanvas();
          this.selectElement(element);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  },
  
  deleteElement() {
    if (!AppState.selectedElement) return;
    
    const card = AppState.getCurrentCard();
    const element = AppState.selectedElement;
    
    card.elements = card.elements.filter(e => e.id !== element.id);
    
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) node.remove();
    
    AppState.selectedElement = null;
    if (DOM.elementProps) DOM.elementProps.style.display = 'none';
  },
  
  updateElementScale(element, scale) {
    element.scale = scale;
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) {
      node.style.width = (element.width * scale) + 'px';
      node.style.height = (element.height * scale) + 'px';
    }
  }
};

// ========================================
// 字体管理器 v2.0
// ========================================
const FontManager = {
  customFonts: [],
  systemFonts: [],
  
  async importFont(file) {
    try {
      const fontName = file.name.replace(/\.[^/.]+$/, '');
      const fontUrl = URL.createObjectURL(file);
      
      const fontFace = new FontFace(fontName, `url(${fontUrl})`);
      await fontFace.load();
      document.fonts.add(fontFace);
      
      const fontData = {
        name: fontName,
        family: `'${fontName}', sans-serif`,
        url: fontUrl,
        type: 'custom'
      };
      
      this.customFonts.push(fontData);
      this.addFontOption(fontData);
      
      return fontData;
    } catch (error) {
      console.error('Failed to import font:', error);
      alert('字体导入失败：' + error.message);
      return null;
    }
  },
  
  async loadSystemFonts() {
    try {
      if (this.systemFonts.length > 0) {
        this.systemFonts.forEach(font => this.addFontOption(font));
        return;
      }
      
      if ('queryLocalFonts' in window) {
        const fonts = await window.queryLocalFonts();
        const uniqueFamilies = [...new Set(fonts.map(f => f.family))].slice(0, 50);
        
        this.systemFonts = uniqueFamilies.map(family => ({
          name: family,
          family: `'${family}', sans-serif`,
          type: 'system'
        }));
        
        this.systemFonts.forEach(font => this.addFontOption(font));
      } else {
        // Fallback: 添加常见系统字体
        const commonFonts = [
          { name: 'Arial', family: 'Arial, sans-serif' },
          { name: 'Times New Roman', family: '"Times New Roman", serif' },
          { name: 'Helvetica', family: 'Helvetica, sans-serif' },
          { name: 'Georgia', family: 'Georgia, serif' },
          { name: 'Verdana', family: 'Verdana, sans-serif' },
          { name: '微软雅黑', family: '"Microsoft YaHei", sans-serif' },
          { name: '宋体', family: 'SimSun, serif' },
          { name: '黑体', family: 'SimHei, sans-serif' }
        ];
        
        this.systemFonts = commonFonts.map(f => ({ ...f, type: 'system' }));
        this.systemFonts.forEach(font => this.addFontOption(font));
      }
    } catch (error) {
      console.error('Failed to load system fonts:', error);
      alert('无法获取系统字体列表');
    }
  },
  
  addFontOption(fontData) {
    if (!DOM.fontFamily) return;
    
    const option = document.createElement('option');
    option.value = fontData.family;
    option.textContent = fontData.type === 'custom' ? `📎 ${fontData.name}` : `💻 ${fontData.name}`;
    DOM.fontFamily.appendChild(option);
  },
  
  init() {
    const importBtn = document.getElementById('importFont');
    const systemBtn = document.getElementById('loadSystemFonts');
    const fontInput = document.getElementById('fontInput');
    
    if (importBtn && fontInput) {
      importBtn.addEventListener('click', () => fontInput.click());
      fontInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          this.importFont(e.target.files[0]);
        }
      });
    }
    
    if (systemBtn) {
      systemBtn.addEventListener('click', () => this.loadSystemFonts());
    }
  }
};

// ========================================
// 背景设置管理 v2.0
// ========================================
const BackgroundManager = {
  init() {
    // 背景类型切换
    document.querySelectorAll('[data-bg-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.bgType;
        const card = AppState.getCurrentCard();
        if (!card) return;
        
        card.background = card.background || {};
        card.background.type = type;
        
        if (type === 'color') {
          card.background.value = '#ffffff';
        } else if (type === 'gradient') {
          card.background.value = 'linear-gradient(135deg, #72e3ad 0%, #3b82f6 100%)';
        } else if (type === 'image') {
          card.background.imageConfig = { fit: 'cover', position: 'center center', scale: 100 };
        }
        
        CanvasManager.renderCanvas();
      });
    });
    
    // 背景颜色
    if (DOM.bgColor) {
      DOM.bgColor.addEventListener('input', (e) => {
        const card = AppState.getCurrentCard();
        if (card && card.background) {
          card.background.value = e.target.value;
          CanvasManager.applyBackground(card.background);
        }
      });
    }
    
    // 渐变预设
    document.querySelectorAll('.gradient-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = AppState.getCurrentCard();
        if (card && card.background) {
          card.background.value = btn.dataset.gradient;
          CanvasManager.applyBackground(card.background);
        }
      });
    });
    
    // 背景图片上传
    const bgImageInput = document.getElementById('bgImageInput');
    const bgImageUpload = document.getElementById('bgImageUpload');
    
    if (bgImageUpload && bgImageInput) {
      bgImageUpload.addEventListener('click', () => bgImageInput.click());
      bgImageInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const card = AppState.getCurrentCard();
            if (card && card.background) {
              card.background.value = event.target.result;
              CanvasManager.applyBackground(card.background);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }
    
    // 适配模式
    document.querySelectorAll('[data-bg-fit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = AppState.getCurrentCard();
        if (!card || !card.background || card.background.type !== 'image') return;
        
        card.background.imageConfig = card.background.imageConfig || {};
        card.background.imageConfig.fit = btn.dataset.bgFit;
        
        CanvasManager.renderCanvas();
      });
    });
    
    // 位置按钮
    document.querySelectorAll('.position-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = AppState.getCurrentCard();
        if (!card || !card.background || card.background.type !== 'image') return;
        
        card.background.imageConfig = card.background.imageConfig || {};
        card.background.imageConfig.position = btn.dataset.position;
        
        CanvasManager.applyBackground(card.background);
        CanvasManager.updateBackgroundUI(card.background);
      });
    });
    
    // 缩放滑块
    const bgScale = document.getElementById('bgScale');
    if (bgScale) {
      bgScale.addEventListener('input', (e) => {
        const card = AppState.getCurrentCard();
        if (!card || !card.background || card.background.type !== 'image') return;
        
        card.background.imageConfig = card.background.imageConfig || {};
        card.background.imageConfig.scale = parseInt(e.target.value);
        
        const bgScaleValue = document.getElementById('bgScaleValue');
        if (bgScaleValue) bgScaleValue.textContent = e.target.value + '%';
        
        CanvasManager.applyBackground(card.background);
      });
    }
  }
};

// ========================================
// ZIP 导出管理器 v2.0
// ========================================
const ExportManager = {
  async exportToZip() {
    const project = AppState.currentProject;
    if (!project || project.cards.length === 0) {
      alert('没有可导出的卡片');
      return;
    }
    
    // 显示导出进度弹窗
    this.showExportModal(true, project.cards.length);
    
    try {
      const zip = new JSZip();
      const folder = zip.folder(project.name || 'cards');
      
      // 检查 html-to-image 库
      if (typeof htmlToImage === 'undefined') {
        throw new Error('html-to-image 库未加载，请刷新页面重试');
      }
      
      // 保存当前状态
      const originalIndex = project.currentCardIndex;
      
      // 导出每张卡片
      for (let i = 0; i < project.cards.length; i++) {
        // 更新进度
        this.updateExportProgress(i + 1, project.cards.length, `正在导出第 ${i + 1} 张卡片...`);
        
        AppState.switchToCard(i);
        CanvasManager.renderCanvas();
        
        // 等待渲染完成
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 生成图片 - 使用正确的分辨率 1080x1440
        const dataUrl = await htmlToImage.toPng(DOM.cardCanvas, {
          quality: 1,
          pixelRatio: 1,
          width: CANVAS_CONFIG.cardWidth,
          height: CANVAS_CONFIG.cardHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
            margin: '0',
            width: CANVAS_CONFIG.cardWidth + 'px',
            height: CANVAS_CONFIG.cardHeight + 'px'
          }
        });
        
        // 转换为 blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        // 添加到 zip
        const fileName = `card_${String(i + 1).padStart(3, '0')}.png`;
        folder.file(fileName, blob);
      }
      
      // 更新进度
      this.updateExportProgress(project.cards.length, project.cards.length, '正在打包文件...');
      
      // 生成 README
      const readme = this.generateReadme(project);
      folder.file('README.txt', readme);
      
      // 下载 zip
      const content = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      }, (metadata) => {
        this.updateExportProgress(
          project.cards.length, 
          project.cards.length, 
          `正在压缩: ${metadata.percent.toFixed(0)}%`
        );
      });
      
      const fileName = `${project.name || 'cards'}_${new Date().toISOString().slice(0, 10)}.zip`;
      saveAs(content, fileName);
      
      // 显示成功
      this.updateExportProgress(project.cards.length, project.cards.length, '导出成功！');
      setTimeout(() => this.showExportModal(false), 1000);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败：' + error.message);
      this.showExportModal(false);
    } finally {
      // 恢复原始卡片
      AppState.switchToCard(originalIndex);
      CanvasManager.renderCanvas();
    }
  },
  
  generateReadme(project) {
    return `EchoRabbit 小红书卡片生成器 - 导出文件
================================

项目名称：${project.name || '未命名'}
导出时间：${new Date().toLocaleString()}
卡片数量：${project.cards.length}
分辨率：1080 x 1440 px

文件列表：
${project.cards.map((card, i) => `- card_${String(i + 1).padStart(3, '0')}.png`).join('\n')}

感谢使用 EchoRabbit 卡片生成器！
`;
  },
  
  showExportModal(show, totalCards = 0) {
    let modal = document.getElementById('exportProgressModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'exportProgressModal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
          <div class="modal-header">
            <h3 class="modal-title">导出进度</h3>
          </div>
          <div class="modal-body" style="padding: 1.5rem;">
            <div class="progress-info" style="margin-bottom: 1rem; text-align: center; font-size: 0.875rem; color: var(--muted-foreground);">
              准备导出...
            </div>
            <div class="progress-bar-container" style="width: 100%; height: 8px; background: var(--muted); border-radius: 4px; overflow: hidden;">
              <div class="progress-bar" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
            </div>
            <div class="progress-count" style="margin-top: 0.5rem; text-align: center; font-size: 0.75rem; color: var(--muted-foreground);">
              0 / 0
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    modal.classList.toggle('active', show);
    
    if (show && totalCards > 0) {
      const countEl = modal.querySelector('.progress-count');
      if (countEl) countEl.textContent = `0 / ${totalCards}`;
    }
  },
  
  updateExportProgress(current, total, message) {
    const modal = document.getElementById('exportProgressModal');
    if (!modal) return;
    
    const progress = (current / total) * 100;
    const bar = modal.querySelector('.progress-bar');
    const info = modal.querySelector('.progress-info');
    const count = modal.querySelector('.progress-count');
    
    if (bar) bar.style.width = progress + '%';
    if (info) info.textContent = message;
    if (count) count.textContent = `${current} / ${total}`;
  },
  
  showLoading(show) {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'loading-overlay';
      overlay.innerHTML = '<div class="loading-spinner"></div>';
      document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active', show);
  },
  
  init() {
    const exportZipBtn = document.getElementById('exportZip');
    if (exportZipBtn) {
      exportZipBtn.addEventListener('click', () => this.exportToZip());
    }
  }
};

// ========================================
// 元素属性管理
// ========================================
const ElementPropManager = {
  init() {
    // 文字内容
    if (DOM.textContent) {
      DOM.textContent.addEventListener('input', (e) => {
        if (AppState.selectedElement && AppState.selectedElement.type === 'text') {
          AppState.selectedElement.content = e.target.value;
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.innerHTML = e.target.value.replace(/\n/g, '<br>');
        }
      });
    }
    
    // 字体
    if (DOM.fontFamily) {
      DOM.fontFamily.addEventListener('change', (e) => {
        if (AppState.selectedElement && AppState.selectedElement.type === 'text') {
          AppState.selectedElement.style.fontFamily = e.target.value;
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.fontFamily = e.target.value;
        }
      });
    }
    
    // 字号
    if (DOM.fontSize) {
      DOM.fontSize.addEventListener('input', (e) => {
        if (AppState.selectedElement && AppState.selectedElement.type === 'text') {
          AppState.selectedElement.style.fontSize = parseInt(e.target.value);
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.fontSize = e.target.value + 'px';
        }
      });
    }
    
    // 字重
    if (DOM.fontWeight) {
      DOM.fontWeight.addEventListener('change', (e) => {
        if (AppState.selectedElement && AppState.selectedElement.type === 'text') {
          AppState.selectedElement.style.fontWeight = parseInt(e.target.value);
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.fontWeight = e.target.value;
        }
      });
    }
    
    // 文字颜色
    if (DOM.textColor) {
      DOM.textColor.addEventListener('input', (e) => {
        if (AppState.selectedElement && AppState.selectedElement.type === 'text') {
          AppState.selectedElement.style.color = e.target.value;
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.color = e.target.value;
        }
      });
    }
    
    // 位置
    if (DOM.posX) {
      DOM.posX.addEventListener('input', (e) => {
        if (AppState.selectedElement) {
          AppState.selectedElement.x = parseInt(e.target.value);
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.left = e.target.value + 'px';
        }
      });
    }
    
    if (DOM.posY) {
      DOM.posY.addEventListener('input', (e) => {
        if (AppState.selectedElement) {
          AppState.selectedElement.y = parseInt(e.target.value);
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.top = e.target.value + 'px';
        }
      });
    }
    
    // 尺寸
    if (DOM.elemWidth) {
      DOM.elemWidth.addEventListener('input', (e) => {
        if (AppState.selectedElement) {
          let width = parseInt(e.target.value);
          AppState.selectedElement.width = width;
          
          // 约束比例
          const maintainRatio = document.getElementById('maintainAspectRatio');
          if (maintainRatio && maintainRatio.checked && AppState.selectedElement.height) {
            const ratio = AppState.selectedElement.height / AppState.selectedElement.width;
            AppState.selectedElement.height = Math.round(width * ratio);
            if (DOM.elemHeight) DOM.elemHeight.value = AppState.selectedElement.height;
          }
          
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) {
            node.style.width = AppState.selectedElement.width + 'px';
            if (maintainRatio && maintainRatio.checked) {
              node.style.height = AppState.selectedElement.height + 'px';
            }
          }
        }
      });
    }
    
    if (DOM.elemHeight) {
      DOM.elemHeight.addEventListener('input', (e) => {
        if (AppState.selectedElement) {
          let height = parseInt(e.target.value);
          AppState.selectedElement.height = height;
          
          // 约束比例
          const maintainRatio = document.getElementById('maintainAspectRatio');
          if (maintainRatio && maintainRatio.checked && AppState.selectedElement.width) {
            const ratio = AppState.selectedElement.width / AppState.selectedElement.height;
            AppState.selectedElement.width = Math.round(height * ratio);
            if (DOM.elemWidth) DOM.elemWidth.value = AppState.selectedElement.width;
          }
          
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) {
            node.style.height = AppState.selectedElement.height + 'px';
            if (maintainRatio && maintainRatio.checked) {
              node.style.width = AppState.selectedElement.width + 'px';
            }
          }
        }
      });
    }
    
    // 旋转
    if (DOM.rotation) {
      DOM.rotation.addEventListener('input', (e) => {
        if (AppState.selectedElement) {
          AppState.selectedElement.rotation = parseInt(e.target.value);
          if (DOM.rotationValue) DOM.rotationValue.textContent = e.target.value + '°';
          const node = DOM.cardCanvas.querySelector(`[data-element-id="${AppState.selectedElement.id}"]`);
          if (node) node.style.transform = `rotate(${e.target.value}deg)`;
        }
      });
    }
    
    // 删除元素
    const deleteBtn = document.getElementById('deleteElement');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => CanvasManager.deleteElement());
    }
    
    // 添加元素
    const addTextBtn = document.getElementById('addText');
    const addImageBtn = document.getElementById('addImage');
    const addStickerBtn = document.getElementById('addSticker');
    
    if (addTextBtn) addTextBtn.addEventListener('click', () => CanvasManager.addElement('text'));
    if (addImageBtn) addImageBtn.addEventListener('click', () => CanvasManager.addElement('image'));
    if (addStickerBtn) addStickerBtn.addEventListener('click', () => CanvasManager.addElement('sticker'));
  }
};

// ========================================
// 模板管理
// ========================================
const TemplateManager = {
  init() {
    // 渲染预设模板
    this.renderPresetTemplates();
    
    // 标签切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.currentTab = btn.dataset.tab;
        this.renderPresetTemplates();
      });
    });
    
    // 保存模板
    const saveBtn = document.getElementById('saveTemplate');
    const saveModal = document.getElementById('saveModal');
    const closeSaveModal = document.getElementById('closeSaveModal');
    const cancelSave = document.getElementById('cancelSave');
    const confirmSave = document.getElementById('confirmSave');
    
    if (saveBtn && saveModal) {
      saveBtn.addEventListener('click', () => saveModal.classList.add('active'));
    }
    
    if (closeSaveModal) {
      closeSaveModal.addEventListener('click', () => saveModal.classList.remove('active'));
    }
    
    if (cancelSave) {
      cancelSave.addEventListener('click', () => saveModal.classList.remove('active'));
    }
    
    if (confirmSave) {
      confirmSave.addEventListener('click', () => {
        const nameInput = document.getElementById('templateName');
        if (nameInput && nameInput.value.trim()) {
          this.saveCustomTemplate(nameInput.value.trim());
          saveModal.classList.remove('active');
          nameInput.value = '';
        }
      });
    }
  },
  
  renderPresetTemplates() {
    if (!DOM.presetTemplates) return;
    
    const templates = PRESET_TEMPLATES[AppState.currentTab] || [];
    DOM.presetTemplates.innerHTML = templates.map(t => `
      <div class="template-item" data-template-id="${t.id}">
        <div class="template-preview" style="background: ${t.background.type === 'color' ? t.background.value : t.background.value};">
          ${t.elements.map(e => `<div style="position:absolute;left:${e.x}px;top:${e.y}px;font-size:${e.style?.fontSize || 14}px;">${e.content?.substring(0, 10) || ''}</div>`).join('')}
        </div>
        <div class="template-name">${t.name}</div>
      </div>
    `).join('');
    
    // 绑定点击事件
    DOM.presetTemplates.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', () => {
        const templateId = item.dataset.templateId;
        this.applyTemplate(templateId);
      });
    });
  },
  
  applyTemplate(templateId) {
    let template = null;
    
    // 在预设中查找
    Object.values(PRESET_TEMPLATES).forEach(list => {
      const found = list.find(t => t.id === templateId);
      if (found) template = found;
    });
    
    // 在自定义模板中查找
    if (!template) {
      template = AppState.customTemplates.find(t => t.id === templateId);
    }
    
    if (template) {
      const card = AppState.getCurrentCard();
      card.background = JSON.parse(JSON.stringify(template.background));
      card.elements = JSON.parse(JSON.stringify(template.elements));
      CanvasManager.renderCanvas();
    }
  },
  
  saveCustomTemplate(name) {
    const card = AppState.getCurrentCard();
    if (!card) return;
    
    const template = {
      id: 'custom_' + Date.now(),
      name: name,
      type: AppState.currentTab,
      background: JSON.parse(JSON.stringify(card.background)),
      elements: JSON.parse(JSON.stringify(card.elements)),
      createdAt: Date.now()
    };
    
    AppState.customTemplates.push(template);
    AppState.saveCustomTemplates();
    this.renderCustomTemplates();
    
    alert('模板保存成功！');
  },
  
  renderCustomTemplates() {
    if (!DOM.customTemplates) return;
    
    if (AppState.customTemplates.length === 0) {
      DOM.customTemplates.innerHTML = '<div class="empty-state">暂无自定义模板</div>';
      return;
    }
    
    DOM.customTemplates.innerHTML = AppState.customTemplates.map(t => `
      <div class="template-list-item" data-template-id="${t.id}">
        <span>${t.name}</span>
        <button class="btn btn-icon btn-sm delete-template" data-template-id="${t.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // 绑定事件
    DOM.customTemplates.querySelectorAll('.template-list-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.delete-template')) return;
        this.applyTemplate(item.dataset.templateId);
      });
    });
    
    DOM.customTemplates.querySelectorAll('.delete-template').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.templateId;
        AppState.customTemplates = AppState.customTemplates.filter(t => t.id !== id);
        AppState.saveCustomTemplates();
        this.renderCustomTemplates();
      });
    });
  }
};

// ========================================
// 全局事件监听 - 拖拽支持
// ========================================
document.addEventListener('mousemove', (e) => {
  if (AppState.isDragging && AppState.draggedElement) {
    e.preventDefault();
    const element = AppState.draggedElement;
    const zoom = AppState.canvasZoom || 0.5;
    
    // 获取画布在视口中的位置
    const canvasRect = DOM.cardCanvas.getBoundingClientRect();
    
    // 计算相对于画布的鼠标位置
    const mouseX = (e.clientX - canvasRect.left) / zoom;
    const mouseY = (e.clientY - canvasRect.top) / zoom;
    
    // 计算新位置
    let newX = mouseX - AppState.dragOffset.x;
    let newY = mouseY - AppState.dragOffset.y;
    
    // 边界限制
    newX = Math.max(0, Math.min(CANVAS_CONFIG.cardWidth - element.width, newX));
    newY = Math.max(0, Math.min(CANVAS_CONFIG.cardHeight - element.height, newY));
    
    // 更新元素位置
    element.x = newX;
    element.y = newY;
    
    // 更新DOM
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) {
      node.style.left = newX + 'px';
      node.style.top = newY + 'px';
    }
    
    // 更新属性面板
    if (DOM.posX) DOM.posX.value = Math.round(newX);
    if (DOM.posY) DOM.posY.value = Math.round(newY);
  }
});

document.addEventListener('mouseup', () => {
  if (AppState.isDragging) {
    AppState.isDragging = false;
    AppState.draggedElement = null;
  }
});

// 点击空白处取消选择
document.addEventListener('click', (e) => {
  if (e.target === DOM.cardCanvas || e.target === DOM.canvasContainer) {
    DOM.cardCanvas.querySelectorAll('.canvas-element').forEach(el => {
      el.classList.remove('selected');
    });
    AppState.selectedElement = null;
    if (DOM.elementProps) DOM.elementProps.style.display = 'none';
  }
});

// ========================================
// 初始化应用
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  DOM.init();
  AppState.init();
  PanelManager.init();
  CardNavigator.init();
  FontManager.init();
  BackgroundManager.init();
  ExportManager.init();
  ElementPropManager.init();
  TemplateManager.init();
  
  // 加载默认模板
  const defaultTemplate = PRESET_TEMPLATES.note[0];
  const card = AppState.getCurrentCard();
  if (card && defaultTemplate) {
    card.background = JSON.parse(JSON.stringify(defaultTemplate.background));
    card.elements = JSON.parse(JSON.stringify(defaultTemplate.elements));
    CanvasManager.renderCanvas();
  }
  
  // 渲染自定义模板
  TemplateManager.renderCustomTemplates();
  
  // 初始化缩放（在渲染完成后）
  ZoomManager.init();
  
  console.log('EchoRabbit 小红书卡片生成器 v2.0 已加载');
});
