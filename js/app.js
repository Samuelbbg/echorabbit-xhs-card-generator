/**
 * EchoRabbit 小红书卡片生成器
 * 主应用逻辑
 */

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
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, content: '标题文字', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 48, fontWeight: 700, color: '#171717', textAlign: 'left', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 40, y: 140, width: 1000, height: 200, content: '在这里输入正文内容，分享你的生活点滴...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 400, color: '#404040', textAlign: 'left', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e3', type: 'text', x: 40, y: 1360, width: 1000, height: 40, content: '#标签 #小红书 #生活', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 20, fontWeight: 400, color: '#72e3ad', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } }
      ]
    },
    {
      id: 'note-xhs-2',
      name: '小红书笔记-渐变',
      type: 'note',
      style: 'xiaohongshu',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #fff5f5 0%, #fff0f3 50%, #f5f0ff 100%)' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 60, width: 1000, height: 80, content: '✨ 今日分享', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 52, fontWeight: 700, color: '#171717', textAlign: 'center', lineHeight: 1.3, letterSpacing: 2, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 60, y: 180, width: 960, height: 400, content: '记录美好生活\n分享每一个精彩瞬间\n让快乐传递下去 💕', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 32, fontWeight: 400, color: '#525252', textAlign: 'center', lineHeight: 2, letterSpacing: 1, textDecoration: 'none' } }
      ]
    },
    {
      id: 'note-xhs-3',
      name: '小红书笔记-图片',
      type: 'note',
      style: 'xiaohongshu',
      background: { type: 'color', value: '#fafafa' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 60, content: '我的日常', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 40, fontWeight: 600, color: '#171717', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'image', x: 40, y: 120, width: 1000, height: 800, src: '' },
        { id: 'e3', type: 'text', x: 40, y: 960, width: 1000, height: 300, content: '点击添加图片描述文字...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#525252', textAlign: 'left', lineHeight: 1.8, letterSpacing: 0, textDecoration: 'none' } }
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
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, content: '📋 必做清单', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 48, fontWeight: 700, color: '#171717', textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 80, y: 160, width: 920, height: 60, content: '1️⃣ 第一步：准备工作', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 500, color: '#171717', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e3', type: 'text', x: 80, y: 240, width: 920, height: 60, content: '2️⃣ 第二步：开始行动', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 500, color: '#171717', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e4', type: 'text', x: 80, y: 320, width: 920, height: 60, content: '3️⃣ 第三步：检查完善', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 500, color: '#171717', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e5', type: 'text', x: 80, y: 400, width: 920, height: 60, content: '4️⃣ 第四步：完成总结', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 500, color: '#171717', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } }
      ]
    },
    {
      id: 'list-xhs-2',
      name: '清单攻略-推荐',
      type: 'list',
      style: 'xiaohongshu',
      background: { type: 'gradient', value: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, content: '⭐ 精选推荐', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 48, fontWeight: 700, color: '#16a34a', textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 60, y: 160, width: 960, height: 200, content: '✅ 推荐项目一\n详细说明文字...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#171717', textAlign: 'left', lineHeight: 1.8, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e3', type: 'text', x: 60, y: 400, width: 960, height: 200, content: '✅ 推荐项目二\n详细说明文字...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#171717', textAlign: 'left', lineHeight: 1.8, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e4', type: 'text', x: 60, y: 640, width: 960, height: 200, content: '✅ 推荐项目三\n详细说明文字...', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#171717', textAlign: 'left', lineHeight: 1.8, letterSpacing: 0, textDecoration: 'none' } }
      ]
    },
    {
      id: 'list-xhs-3',
      name: '清单攻略-对比',
      type: 'list',
      style: 'xiaohongshu',
      background: { type: 'color', value: '#ffffff' },
      elements: [
        { id: 'e1', type: 'text', x: 40, y: 40, width: 1000, height: 80, content: '⚖️ 优缺点对比', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 44, fontWeight: 700, color: '#171717', textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 40, y: 160, width: 480, height: 500, content: '👍 优点\n• 优点一\n• 优点二\n• 优点三', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#16a34a', textAlign: 'left', lineHeight: 2, letterSpacing: 0, textDecoration: 'none' } },
        { id: 'e3', type: 'text', x: 560, y: 160, width: 480, height: 500, content: '👎 缺点\n• 缺点一\n• 缺点二\n• 缺点三', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, fontWeight: 400, color: '#dc2626', textAlign: 'left', lineHeight: 2, letterSpacing: 0, textDecoration: 'none' } }
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
        { id: 'e1', type: 'text', x: 80, y: 400, width: 920, height: 400, content: '"生活不是等待风暴过去，而是学会在雨中翩翩起舞。"', style: { fontFamily: "'Noto Serif SC', serif", fontSize: 48, fontWeight: 600, color: '#ffffff', textAlign: 'center', lineHeight: 1.6, letterSpacing: 2, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 80, y: 900, width: 920, height: 60, content: '—— 佚名', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, fontWeight: 400, color: '#a3a3a3', textAlign: 'right', lineHeight: 1.5, letterSpacing: 0, textDecoration: 'none' } }
      ]
    },
    {
      id: 'quote-xhs-2',
      name: '语录卡片-渐变',
      type: 'quote',
      style: 'xiaohongshu',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      elements: [
        { id: 'e1', type: 'text', x: 60, y: 300, width: 960, height: 500, content: '保持热爱\n奔赴山海', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 72, fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.4, letterSpacing: 8, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 60, y: 900, width: 960, height: 50, content: 'STAY HUNGRY, STAY FOOLISH', style: { fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 1.5, letterSpacing: 4, textDecoration: 'none' } }
      ]
    },
    {
      id: 'quote-xhs-3',
      name: '语录卡片-简约',
      type: 'quote',
      style: 'minimal',
      background: { type: 'color', value: '#f8fafc' },
      elements: [
        { id: 'e1', type: 'text', x: 100, y: 500, width: 880, height: 300, content: 'Less is More', style: { fontFamily: "Outfit, sans-serif", fontSize: 80, fontWeight: 700, color: '#0f172a', textAlign: 'center', lineHeight: 1.2, letterSpacing: -2, textDecoration: 'none' } },
        { id: 'e2', type: 'text', x: 100, y: 850, width: 880, height: 50, content: '少即是多，简约而不简单', style: { fontFamily: "'Noto Sans SC', sans-serif", fontSize: 24, fontWeight: 400, color: '#64748b', textAlign: 'center', lineHeight: 1.5, letterSpacing: 4, textDecoration: 'none' } }
      ]
    }
  ]
};

// ========================================
// 应用状态管理
// ========================================
const AppState = {
  currentTemplate: null,
  selectedElement: null,
  customTemplates: [],
  batchData: [],
  isDragging: false,
  dragOffset: { x: 0, y: 0 },
  currentTab: 'note',
  bgType: 'color',
  exportFormat: 'png',
  exportQuality: 1,
  exportScale: 2,
  
  // 初始化
  init() {
    this.loadCustomTemplates();
    this.loadBatchData();
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
  // 画布
  cardCanvas: null,
  canvasContainer: null,
  
  // 模板面板
  presetTemplates: null,
  customTemplates: null,
  templateTabs: null,
  
  // 属性面板
  elementProps: null,
  textStyleGroup: null,
  fontFamilyGroup: null,
  imageProps: null,
  
  // 背景设置
  bgColorGroup: null,
  bgGradientGroup: null,
  bgImageGroup: null,
  bgColor: null,
  bgGradientValue: null,
  
  // 文字样式
  textContent: null,
  fontFamily: null,
  fontSize: null,
  fontWeight: null,
  textColor: null,
  lineHeight: null,
  letterSpacing: null,
  
  // 位置尺寸
  posX: null,
  posY: null,
  elemWidth: null,
  elemHeight: null,
  rotation: null,
  rotationValue: null,
  
  // 批量生成
  batchSection: null,
  batchContent: null,
  batchTable: null,
  batchHeader: null,
  batchBody: null,
  
  // 弹窗
  exportModal: null,
  saveModal: null,
  
  // 初始化
  init() {
    this.cardCanvas = document.getElementById('cardCanvas');
    this.canvasContainer = document.getElementById('canvasContainer');
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
  }
};

// ========================================
// 模板管理
// ========================================
const TemplateManager = {
  // 渲染预设模板列表
  renderPresetTemplates(type) {
    const templates = PRESET_TEMPLATES[type] || [];
    DOM.presetTemplates.innerHTML = templates.map(t => `
      <div class="template-item" data-template-id="${t.id}" data-type="preset">
        <div class="template-preview" style="
          width: 100%; 
          height: 100%; 
          background: ${t.background.type === 'gradient' ? t.background.value : t.background.value};
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 10px;
          color: ${t.style === 'xiaohongshu' && t.background.type === 'color' && t.background.value === '#171717' ? '#fff' : '#333'};
        ">
          <span>${t.name}</span>
        </div>
      </div>
    `).join('');
    
    // 绑定点击事件
    DOM.presetTemplates.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', () => {
        const templateId = item.dataset.templateId;
        const type = item.dataset.type;
        this.loadTemplate(templateId, type);
        
        // 更新选中状态
        DOM.presetTemplates.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  },
  
  // 渲染自定义模板列表
  renderCustomTemplates() {
    if (AppState.customTemplates.length === 0) {
      DOM.customTemplates.innerHTML = '<div class="empty-state">暂无自定义模板</div>';
      return;
    }
    
    DOM.customTemplates.innerHTML = AppState.customTemplates.map(t => `
      <div class="template-item" data-template-id="${t.id}" data-type="custom">
        <div class="template-preview" style="
          width: 100%; 
          height: 100%; 
          background: ${t.background.type === 'gradient' ? t.background.value : t.background.value};
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 10px;
          color: #333;
        ">
          <span>${t.name}</span>
        </div>
        <button class="btn btn-icon btn-sm delete-template" data-template-id="${t.id}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // 绑定事件
    DOM.customTemplates.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.delete-template')) return;
        
        const templateId = item.dataset.templateId;
        this.loadTemplate(templateId, 'custom');
        
        DOM.customTemplates.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
    
    // 删除按钮
    DOM.customTemplates.querySelectorAll('.delete-template').forEach(btn => {
      btn.addEventListener('click', () => {
        const templateId = btn.dataset.templateId;
        this.deleteCustomTemplate(templateId);
      });
    });
  },
  
  // 加载模板
  loadTemplate(templateId, type) {
    let template;
    
    if (type === 'preset') {
      // 从预设中查找
      for (const key in PRESET_TEMPLATES) {
        template = PRESET_TEMPLATES[key].find(t => t.id === templateId);
        if (template) break;
      }
    } else {
      // 从自定义模板中查找
      template = AppState.customTemplates.find(t => t.id === templateId);
    }
    
    if (!template) {
      console.warn('Template not found:', templateId);
      return;
    }
    
    // 深拷贝模板
    AppState.currentTemplate = JSON.parse(JSON.stringify(template));
    
    // 渲染画布
    CanvasManager.renderCanvas();
    
    // 更新背景设置UI
    this.updateBackgroundUI();
    
    // 初始化批量数据表头
    BatchManager.initBatchTable();
  },
  
  // 更新背景设置UI
  updateBackgroundUI() {
    const bg = AppState.currentTemplate.background;
    
    // 更新背景类型按钮
    document.querySelectorAll('[data-bg-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bgType === bg.type);
    });
    
    // 显示/隐藏对应的设置组
    DOM.bgColorGroup.style.display = bg.type === 'color' ? 'block' : 'none';
    DOM.bgGradientGroup.style.display = bg.type === 'gradient' ? 'block' : 'none';
    DOM.bgImageGroup.style.display = bg.type === 'image' ? 'block' : 'none';
    
    // 更新值
    if (bg.type === 'color') {
      DOM.bgColor.value = bg.value;
    } else if (bg.type === 'gradient') {
      DOM.bgGradientValue.value = bg.value;
    }
  },
  
  // 保存为自定义模板
  saveAsCustom(name) {
    if (!AppState.currentTemplate) return;
    
    const template = {
      ...JSON.parse(JSON.stringify(AppState.currentTemplate)),
      id: 'custom_' + Date.now(),
      name: name,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    AppState.customTemplates.push(template);
    AppState.saveCustomTemplates();
    this.renderCustomTemplates();
  },
  
  // 删除自定义模板
  deleteCustomTemplate(templateId) {
    AppState.customTemplates = AppState.customTemplates.filter(t => t.id !== templateId);
    AppState.saveCustomTemplates();
    this.renderCustomTemplates();
  },
  
  // 导出模板配置
  exportTemplate() {
    if (!AppState.currentTemplate) return;
    
    const dataStr = JSON.stringify(AppState.currentTemplate, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `template_${AppState.currentTemplate.name}_${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  },
  
  // 导入模板配置
  importTemplate(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target.result);
        template.id = 'custom_' + Date.now();
        template.createdAt = Date.now();
        template.updatedAt = Date.now();
        
        AppState.customTemplates.push(template);
        AppState.saveCustomTemplates();
        this.renderCustomTemplates();
        
        alert('模板导入成功！');
      } catch (err) {
        alert('模板导入失败：' + err.message);
      }
    };
    reader.readAsText(file);
  }
};

// ========================================
// 画布管理
// ========================================
const CanvasManager = {
  // 渲染画布
  renderCanvas() {
    if (!AppState.currentTemplate) return;
    
    const template = AppState.currentTemplate;
    
    // 设置背景
    this.applyBackground(template.background);
    
    // 清空现有元素
    DOM.cardCanvas.innerHTML = '';
    
    // 渲染元素
    template.elements.forEach(element => {
      this.createElementNode(element);
    });
    
    // 更新批量表头
    BatchManager.initBatchTable();
  },
  
  // 应用背景
  applyBackground(background) {
    if (background.type === 'color') {
      DOM.cardCanvas.style.background = background.value;
    } else if (background.type === 'gradient') {
      DOM.cardCanvas.style.background = background.value;
    } else if (background.type === 'image') {
      DOM.cardCanvas.style.background = `url(${background.value}) center/cover no-repeat`;
      
      // 应用模糊和暗化
      if (background.overlay) {
        let filter = '';
        if (background.overlay.type === 'blur') {
          filter += `blur(${background.overlay.value}px) `;
        }
        if (background.overlay.type === 'darken') {
          filter += `brightness(${100 - background.overlay.value}%)`;
        }
        DOM.cardCanvas.style.filter = filter;
      }
    }
  },
  
  // 创建元素节点
  createElementNode(element) {
    const node = document.createElement('div');
    node.className = 'canvas-element';
    node.dataset.elementId = element.id;
    node.style.left = element.x + 'px';
    node.style.top = element.y + 'px';
    node.style.width = element.width + 'px';
    node.style.height = element.height + 'px';
    node.style.zIndex = element.zIndex || 1;
    
    if (element.rotation) {
      node.style.transform = `rotate(${element.rotation}deg)`;
    }
    
    if (element.type === 'text') {
      node.classList.add('canvas-text');
      node.innerHTML = element.content.replace(/\n/g, '<br>');
      node.contentEditable = false;
      
      // 应用文字样式
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
      
      // 双击编辑
      node.addEventListener('dblclick', () => {
        node.contentEditable = true;
        node.focus();
      });
      
      // 失去焦点保存
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
        node.appendChild(img);
      } else {
        // 占位符
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
    
    // 绑定事件
    this.bindElementEvents(node, element);
    
    DOM.cardCanvas.appendChild(node);
    return node;
  },
  
  // 绑定元素事件
  bindElementEvents(node, element) {
    // 点击选中
    node.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('resize-handle')) return;
      if (node.contentEditable === 'true') return;
      
      e.stopPropagation();
      this.selectElement(element);
      
      // 开始拖拽
      AppState.isDragging = true;
      const zoom = AppState.canvasZoom || 0.5;
      AppState.dragOffset = {
        x: e.clientX / zoom - element.x,
        y: e.clientY / zoom - element.y
      };
    });
    
    // 调整大小
    node.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        this.startResize(e, element, handle.dataset.handle);
      });
    });
  },
  
  // 选中元素
  selectElement(element) {
    // 移除之前的选中状态
    DOM.cardCanvas.querySelectorAll('.canvas-element').forEach(el => {
      el.classList.remove('selected');
    });
    
    AppState.selectedElement = element;
    
    // 添加选中状态
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) {
      node.classList.add('selected');
    }
    
    // 显示属性面板
    this.showElementProps(element);
  },
  
  // 显示元素属性
  showElementProps(element) {
    DOM.elementProps.style.display = 'block';
    
    // 根据元素类型显示不同的属性
    const isText = element.type === 'text';
    const isImage = element.type === 'image' || element.type === 'sticker';
    
    DOM.textStyleGroup.style.display = isText ? 'block' : 'none';
    DOM.fontFamilyGroup.style.display = isText ? 'block' : 'none';
    DOM.imageProps.style.display = isImage ? 'block' : 'none';
    
    // 填充值
    if (isText) {
      DOM.textContent.value = element.content || '';
      if (element.style) {
        DOM.fontFamily.value = element.style.fontFamily;
        DOM.fontSize.value = element.style.fontSize;
        DOM.fontWeight.value = element.style.fontWeight;
        DOM.textColor.value = element.style.color;
        DOM.lineHeight.value = element.style.lineHeight;
        DOM.letterSpacing.value = element.style.letterSpacing;
        
        // 更新对齐按钮
        document.querySelectorAll('[data-align]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.align === element.style.textAlign);
        });
        
        // 更新装饰按钮
        document.querySelectorAll('[data-decoration]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.decoration === element.style.textDecoration);
        });
      }
    }
    
    // 通用属性
    DOM.posX.value = element.x;
    DOM.posY.value = element.y;
    DOM.elemWidth.value = element.width;
    DOM.elemHeight.value = element.height;
    DOM.rotation.value = element.rotation || 0;
    DOM.rotationValue.textContent = (element.rotation || 0) + '°';
  },
  
  // 更新元素属性
  updateElementProp(prop, value) {
    if (!AppState.selectedElement) return;
    
    const element = AppState.selectedElement;
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    
    switch (prop) {
      case 'content':
        element.content = value;
        if (node) node.innerHTML = value.replace(/\n/g, '<br>');
        break;
      case 'fontFamily':
        element.style.fontFamily = value;
        if (node) node.style.fontFamily = value;
        break;
      case 'fontSize':
        element.style.fontSize = parseInt(value);
        if (node) node.style.fontSize = value + 'px';
        break;
      case 'fontWeight':
        element.style.fontWeight = parseInt(value);
        if (node) node.style.fontWeight = value;
        break;
      case 'color':
        element.style.color = value;
        if (node) node.style.color = value;
        break;
      case 'textAlign':
        element.style.textAlign = value;
        if (node) node.style.textAlign = value;
        break;
      case 'textDecoration':
        element.style.textDecoration = value;
        if (node) node.style.textDecoration = value;
        break;
      case 'lineHeight':
        element.style.lineHeight = parseFloat(value);
        if (node) node.style.lineHeight = value;
        break;
      case 'letterSpacing':
        element.style.letterSpacing = parseInt(value);
        if (node) node.style.letterSpacing = value + 'px';
        break;
      case 'x':
        element.x = parseInt(value);
        if (node) node.style.left = value + 'px';
        break;
      case 'y':
        element.y = parseInt(value);
        if (node) node.style.top = value + 'px';
        break;
      case 'width':
        element.width = parseInt(value);
        if (node) node.style.width = value + 'px';
        break;
      case 'height':
        element.height = parseInt(value);
        if (node) node.style.height = value + 'px';
        break;
      case 'rotation':
        element.rotation = parseInt(value);
        if (node) node.style.transform = `rotate(${value}deg)`;
        DOM.rotationValue.textContent = value + '°';
        break;
    }
  },
  
  // 添加新元素
  addElement(type) {
    if (!AppState.currentTemplate) return;
    
    const id = 'e' + Date.now();
    const element = {
      id,
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 300 : 200,
      height: type === 'text' ? 100 : 200,
      rotation: 0,
      zIndex: AppState.currentTemplate.elements.length + 1
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
    } else if (type === 'image' || type === 'sticker') {
      element.src = '';
      
      // 触发文件选择
      const input = document.getElementById(type === 'image' ? 'imageInput' : 'stickerInput');
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            element.src = event.target.result;
            const node = DOM.cardCanvas.querySelector(`[data-element-id="${id}"]`);
            if (node) {
              node.innerHTML = `<img src="${element.src}" alt="${type}">`;
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
    
    AppState.currentTemplate.elements.push(element);
    this.createElementNode(element);
    this.selectElement(element);
  },
  
  // 删除元素
  deleteElement() {
    if (!AppState.selectedElement) return;
    
    const element = AppState.selectedElement;
    AppState.currentTemplate.elements = AppState.currentTemplate.elements.filter(e => e.id !== element.id);
    
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) node.remove();
    
    AppState.selectedElement = null;
    DOM.elementProps.style.display = 'none';
  },
  
  // 复制元素
  duplicateElement() {
    if (!AppState.selectedElement) return;
    
    const original = AppState.selectedElement;
    const newElement = JSON.parse(JSON.stringify(original));
    newElement.id = 'e' + Date.now();
    newElement.x += 20;
    newElement.y += 20;
    newElement.zIndex = AppState.currentTemplate.elements.length + 1;
    
    AppState.currentTemplate.elements.push(newElement);
    this.createElementNode(newElement);
    this.selectElement(newElement);
  },
  
  // 调整层级
  changeLayer(direction) {
    if (!AppState.selectedElement) return;
    
    const element = AppState.selectedElement;
    const elements = AppState.currentTemplate.elements;
    const index = elements.findIndex(e => e.id === element.id);
    
    if (direction === 'up' && index < elements.length - 1) {
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
    } else if (direction === 'down' && index > 0) {
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
    } else if (direction === 'top') {
      elements.splice(index, 1);
      elements.push(element);
    } else if (direction === 'bottom') {
      elements.splice(index, 1);
      elements.unshift(element);
    }
    
    // 重新渲染
    elements.forEach((e, i) => {
      e.zIndex = i + 1;
      const node = DOM.cardCanvas.querySelector(`[data-element-id="${e.id}"]`);
      if (node) node.style.zIndex = e.zIndex;
    });
  },
  
  // 开始调整大小
  startResize(e, element, handle) {
    e.preventDefault();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;
    const startLeft = element.x;
    const startTop = element.y;
    
    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      if (handle.includes('e')) {
        element.width = Math.max(50, startWidth + dx);
      }
      if (handle.includes('w')) {
        const newWidth = Math.max(50, startWidth - dx);
        element.x = startLeft + startWidth - newWidth;
        element.width = newWidth;
      }
      if (handle.includes('s')) {
        element.height = Math.max(50, startHeight + dy);
      }
      if (handle.includes('n')) {
        const newHeight = Math.max(50, startHeight - dy);
        element.y = startTop + startHeight - newHeight;
        element.height = newHeight;
      }
      
      const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
      if (node) {
        node.style.width = element.width + 'px';
        node.style.height = element.height + 'px';
        node.style.left = element.x + 'px';
        node.style.top = element.y + 'px';
      }
      
      // 更新属性面板
      DOM.elemWidth.value = element.width;
      DOM.elemHeight.value = element.height;
      DOM.posX.value = element.x;
      DOM.posY.value = element.y;
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  },
  
  // 更新背景
  updateBackground(type, value) {
    if (!AppState.currentTemplate) return;
    
    AppState.currentTemplate.background.type = type;
    AppState.currentTemplate.background.value = value;
    
    this.applyBackground(AppState.currentTemplate.background);
    TemplateManager.updateBackgroundUI();
  }
};

// ========================================
// 批量生成管理
// ========================================
const BatchManager = {
  // 初始化批量表格
  initBatchTable() {
    if (!AppState.currentTemplate) return;
    
    // 获取所有文本元素的ID作为列
    const textElements = AppState.currentTemplate.elements.filter(e => e.type === 'text');
    
    if (textElements.length === 0) {
      DOM.batchHeader.innerHTML = '<th>无文本元素</th>';
      DOM.batchBody.innerHTML = '';
      return;
    }
    
    // 生成表头
    DOM.batchHeader.innerHTML = textElements.map(e => 
      `<th>${e.content.substring(0, 10)}${e.content.length > 10 ? '...' : ''}</th>`
    ).join('') + '<th>操作</th>';
    
    // 渲染现有数据
    this.renderBatchRows();
  },
  
  // 渲染批量数据行
  renderBatchRows() {
    const textElements = AppState.currentTemplate.elements.filter(e => e.type === 'text');
    
    if (AppState.batchData.length === 0) {
      DOM.batchBody.innerHTML = '<tr><td colspan="' + (textElements.length + 1) + '" style="text-align:center;color:#999;">暂无数据，点击"添加行"开始</td></tr>';
      return;
    }
    
    DOM.batchBody.innerHTML = AppState.batchData.map((row, index) => `
      <tr data-row-index="${index}">
        ${textElements.map(e => `
          <td><input type="text" value="${row.values[e.id] || ''}" data-element-id="${e.id}"></td>
        `).join('')}
        <td><button class="btn btn-sm btn-danger delete-row">删除</button></td>
      </tr>
    `).join('');
    
    // 绑定输入事件
    DOM.batchBody.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        const rowIndex = parseInt(input.closest('tr').dataset.rowIndex);
        const elementId = input.dataset.elementId;
        AppState.batchData[rowIndex].values[elementId] = input.value;
        AppState.saveBatchData();
      });
    });
    
    // 绑定删除按钮
    DOM.batchBody.querySelectorAll('.delete-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const rowIndex = parseInt(btn.closest('tr').dataset.rowIndex);
        AppState.batchData.splice(rowIndex, 1);
        AppState.saveBatchData();
        this.renderBatchRows();
      });
    });
  },
  
  // 添加批量行
  addBatchRow() {
    const textElements = AppState.currentTemplate.elements.filter(e => e.type === 'text');
    
    const row = {
      id: 'row_' + Date.now(),
      values: {}
    };
    
    textElements.forEach(e => {
      row.values[e.id] = e.content;
    });
    
    AppState.batchData.push(row);
    AppState.saveBatchData();
    this.renderBatchRows();
  },
  
  // 清空批量数据
  clearBatchData() {
    AppState.batchData = [];
    AppState.saveBatchData();
    this.renderBatchRows();
  },
  
  // 导入CSV
  importCSV(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('CSV文件格式不正确');
          return;
        }
        
        const headers = lines[0].split(',').map(h => h.trim());
        const textElements = AppState.currentTemplate.elements.filter(e => e.type === 'text');
        
        // 清空现有数据
        AppState.batchData = [];
        
        // 解析数据行
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const row = {
            id: 'row_' + Date.now() + '_' + i,
            values: {}
          };
          
          headers.forEach((header, index) => {
            // 尝试匹配元素ID或索引
            const element = textElements.find(e => 
              e.content.includes(header) || 
              e.id === header
            );
            
            if (element) {
              row.values[element.id] = values[index] || '';
            }
          });
          
          AppState.batchData.push(row);
        }
        
        AppState.saveBatchData();
        this.renderBatchRows();
        alert(`成功导入 ${AppState.batchData.length} 行数据`);
      } catch (err) {
        alert('CSV导入失败：' + err.message);
      }
    };
    reader.readAsText(file);
  },
  
  // 批量生成
  async batchGenerate() {
    if (AppState.batchData.length === 0) {
      alert('请先添加批量数据');
      return;
    }
    
    const results = [];
    
    for (let i = 0; i < AppState.batchData.length; i++) {
      const row = AppState.batchData[i];
      
      // 应用数据到模板
      Object.entries(row.values).forEach(([elementId, value]) => {
        const element = AppState.currentTemplate.elements.find(e => e.id === elementId);
        if (element) {
          element.content = value;
        }
      });
      
      // 重新渲染
      CanvasManager.renderCanvas();
      
      // 等待渲染完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 生成图片
      const dataUrl = await ExportManager.generateImageDataUrl();
      results.push({
        index: i,
        dataUrl: dataUrl
      });
    }
    
    return results;
  }
};

// ========================================
// 画布缩放管理
// ========================================
const ZoomManager = {
  minZoom: 0.2,
  maxZoom: 2,
  zoomStep: 0.1,
  
  // 设置缩放
  setZoom(zoom) {
    zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    AppState.canvasZoom = zoom;
    
    const canvas = DOM.cardCanvas;
    canvas.style.transform = `scale(${zoom})`;
    
    // 更新显示
    document.getElementById('zoomLevel').textContent = Math.round(zoom * 100) + '%';
    document.getElementById('canvasSize').textContent = `${Math.round(1080 * zoom)} x ${Math.round(1440 * zoom)}`;
    
    // 调整容器大小以适应缩放后的画布
    this.adjustContainer();
  },
  
  // 放大
  zoomIn() {
    this.setZoom((AppState.canvasZoom || 0.5) + this.zoomStep);
  },
  
  // 缩小
  zoomOut() {
    this.setZoom((AppState.canvasZoom || 0.5) - this.zoomStep);
  },
  
  // 自适应
  zoomFit() {
    const container = DOM.canvasContainer;
    const containerWidth = container.clientWidth - 40; // 留边距
    const containerHeight = container.clientHeight - 40;
    
    const scaleX = containerWidth / 1080;
    const scaleY = containerHeight / 1440;
    const zoom = Math.min(scaleX, scaleY, 1); // 最大不超过100%
    
    this.setZoom(zoom);
  },
  
  // 调整容器大小
  adjustContainer() {
    const zoom = AppState.canvasZoom || 0.5;
    const width = 1080 * zoom;
    const height = 1440 * zoom;
    
    // 容器至少要有画布大小
    DOM.canvasContainer.style.minWidth = width + 'px';
    DOM.canvasContainer.style.minHeight = height + 'px';
  },
  
  // 初始化
  init() {
    AppState.canvasZoom = 0.5;
    this.setZoom(0.5);
    
    // 绑定按钮事件
    document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
    document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
    document.getElementById('zoomFit').addEventListener('click', () => this.zoomFit());
    
    // 鼠标滚轮缩放
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
    
    // 窗口大小改变时自适应
    window.addEventListener('resize', () => {
      if (AppState.autoFit) {
        this.zoomFit();
      }
    });
  }
};

// ========================================
// 导出管理
// ========================================
const ExportManager = {
  // 确保 htmlToImage 库已加载
  ensureLibrary() {
    return new Promise((resolve, reject) => {
      // 检查库是否已存在
      if (typeof htmlToImage !== 'undefined' && htmlToImage.toPng) {
        resolve();
        return;
      }
      
      // 尝试从 window 对象获取（某些 CDN 加载方式不同）
      if (window.htmlToImage && window.htmlToImage.toPng) {
        htmlToImage = window.htmlToImage;
        resolve();
        return;
      }
      
      // 等待已存在的 script 标签加载完成
      const existingScript = document.querySelector('script[src*="html-to-image"]');
      if (existingScript) {
        const checkLoaded = () => {
          if (typeof htmlToImage !== 'undefined' && htmlToImage.toPng) {
            resolve();
          } else if (window.htmlToImage && window.htmlToImage.toPng) {
            htmlToImage = window.htmlToImage;
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }
      
      // 动态加载库
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js';
      script.onload = () => {
        // 再次检查全局对象
        if (typeof htmlToImage === 'undefined' && window.htmlToImage) {
          htmlToImage = window.htmlToImage;
        }
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load html-to-image library'));
      document.head.appendChild(script);
    });
  },
  
  // 生成图片数据URL
  async generateImageDataUrl() {
    // 确保库已加载
    await this.ensureLibrary();
    
    const canvas = DOM.cardCanvas;
    
    // 临时移除选中状态
    const selected = canvas.querySelector('.selected');
    if (selected) selected.classList.remove('selected');
    
    // 临时移除变换以获取完整尺寸
    const originalTransform = canvas.style.transform;
    canvas.style.transform = 'none';
    
    try {
      const dataUrl = await htmlToImage.toPng(canvas, {
        width: 1080,
        height: 1440,
        pixelRatio: 1,
        quality: AppState.exportQuality,
        backgroundColor: null,
        style: {
          transform: 'none',
          transformOrigin: 'top left'
        }
      });
      
      return dataUrl;
    } catch (err) {
      console.error('Export failed:', err);
      throw err;
    } finally {
      // 恢复选中状态和变换
      canvas.style.transform = originalTransform;
      if (selected) selected.classList.add('selected');
    }
  },
  
  // 导出单张图片
  async exportSingle() {
    try {
      const dataUrl = await this.generateImageDataUrl();
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `card_${Date.now()}.${AppState.exportFormat}`;
      a.click();
      
      return true;
    } catch (err) {
      alert('导出失败：' + err.message);
      return false;
    }
  },
  
  // 批量导出
  async batchExport() {
    const results = await BatchManager.batchGenerate();
    
    if (!results || results.length === 0) return;
    
    // 如果是单张，直接下载
    if (results.length === 1) {
      const a = document.createElement('a');
      a.href = results[0].dataUrl;
      a.download = `card_batch_${Date.now()}.png`;
      a.click();
      return;
    }
    
    // 多张，使用 JSZip 打包（这里简化处理，逐张下载）
    for (let i = 0; i < results.length; i++) {
      const a = document.createElement('a');
      a.href = results[i].dataUrl;
      a.download = `card_${i + 1}_${Date.now()}.png`;
      a.click();
      
      // 添加延迟避免浏览器拦截
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    alert(`已导出 ${results.length} 张图片`);
  }
};

// ========================================
// 事件绑定
// ========================================
function bindEvents() {
  // 主题切换
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
  
  // 模板标签切换
  DOM.templateTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.templateTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.currentTab = tab.dataset.tab;
      TemplateManager.renderPresetTemplates(AppState.currentTab);
    });
  });
  
  // 画布点击空白处取消选中
  DOM.canvasContainer.addEventListener('mousedown', (e) => {
    if (e.target === DOM.canvasContainer || e.target === DOM.cardCanvas) {
      DOM.cardCanvas.querySelectorAll('.canvas-element').forEach(el => {
        el.classList.remove('selected');
      });
      AppState.selectedElement = null;
      DOM.elementProps.style.display = 'none';
    }
  });
  
  // 全局鼠标移动（拖拽）
  document.addEventListener('mousemove', (e) => {
    if (!AppState.isDragging || !AppState.selectedElement) return;
    
    const element = AppState.selectedElement;
    const zoom = AppState.canvasZoom || 0.5;
    
    // 获取画布相对于视口的位置
    const canvasRect = DOM.cardCanvas.getBoundingClientRect();
    
    // 计算相对于画布的坐标（考虑缩放）
    element.x = (e.clientX - canvasRect.left) / zoom - (element.x - parseFloat(DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`).style.left) || 0) + element.x;
    element.y = (e.clientY - canvasRect.top) / zoom - (element.y - parseFloat(DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`).style.top) || 0) + element.y;
    
    // 简化的拖拽计算
    element.x = e.clientX / zoom - AppState.dragOffset.x;
    element.y = e.clientY / zoom - AppState.dragOffset.y;
    
    // 限制在画布内
    element.x = Math.max(0, Math.min(1080 - element.width, element.x));
    element.y = Math.max(0, Math.min(1440 - element.height, element.y));
    
    const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
    if (node) {
      node.style.left = element.x + 'px';
      node.style.top = element.y + 'px';
    }
    
    // 更新属性面板
    DOM.posX.value = Math.round(element.x);
    DOM.posY.value = Math.round(element.y);
  });
  
  // 全局鼠标释放
  document.addEventListener('mouseup', () => {
    AppState.isDragging = false;
  });
  
  // 背景类型切换
  document.querySelectorAll('[data-bg-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.bgType;
      let value;
      
      if (type === 'color') {
        value = DOM.bgColor.value;
      } else if (type === 'gradient') {
        value = DOM.bgGradientValue.value || 'linear-gradient(135deg, #72e3ad 0%, #3b82f6 100%)';
      } else if (type === 'image') {
        value = AppState.currentTemplate.background.value || '';
      }
      
      CanvasManager.updateBackground(type, value);
    });
  });
  
  // 背景颜色
  DOM.bgColor.addEventListener('input', () => {
    CanvasManager.updateBackground('color', DOM.bgColor.value);
  });
  
  // 渐变预设
  document.querySelectorAll('.gradient-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.bgGradientValue.value = btn.dataset.gradient;
      CanvasManager.updateBackground('gradient', btn.dataset.gradient);
    });
  });
  
  // 背景图片上传
  document.getElementById('bgImageUpload').addEventListener('click', () => {
    document.getElementById('bgImageInput').click();
  });
  
  document.getElementById('bgImageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        CanvasManager.updateBackground('image', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
  
  // 文字属性
  DOM.textContent.addEventListener('input', () => {
    CanvasManager.updateElementProp('content', DOM.textContent.value);
  });
  
  DOM.fontFamily.addEventListener('change', () => {
    CanvasManager.updateElementProp('fontFamily', DOM.fontFamily.value);
  });
  
  DOM.fontSize.addEventListener('input', () => {
    CanvasManager.updateElementProp('fontSize', DOM.fontSize.value);
  });
  
  DOM.fontWeight.addEventListener('change', () => {
    CanvasManager.updateElementProp('fontWeight', DOM.fontWeight.value);
  });
  
  DOM.textColor.addEventListener('input', () => {
    CanvasManager.updateElementProp('color', DOM.textColor.value);
  });
  
  DOM.lineHeight.addEventListener('input', () => {
    CanvasManager.updateElementProp('lineHeight', DOM.lineHeight.value);
  });
  
  DOM.letterSpacing.addEventListener('input', () => {
    CanvasManager.updateElementProp('letterSpacing', DOM.letterSpacing.value);
  });
  
  // 对齐方式
  document.querySelectorAll('[data-align]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-align]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CanvasManager.updateElementProp('textAlign', btn.dataset.align);
    });
  });
  
  // 文字装饰
  document.querySelectorAll('[data-decoration]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-decoration]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CanvasManager.updateElementProp('textDecoration', btn.dataset.decoration);
    });
  });
  
  // 位置尺寸
  DOM.posX.addEventListener('input', () => {
    CanvasManager.updateElementProp('x', DOM.posX.value);
  });
  
  DOM.posY.addEventListener('input', () => {
    CanvasManager.updateElementProp('y', DOM.posY.value);
  });
  
  DOM.elemWidth.addEventListener('input', () => {
    CanvasManager.updateElementProp('width', DOM.elemWidth.value);
  });
  
  DOM.elemHeight.addEventListener('input', () => {
    CanvasManager.updateElementProp('height', DOM.elemHeight.value);
  });
  
  DOM.rotation.addEventListener('input', () => {
    CanvasManager.updateElementProp('rotation', DOM.rotation.value);
  });
  
  // 层级
  document.getElementById('layerBottom').addEventListener('click', () => {
    CanvasManager.changeLayer('bottom');
  });
  
  document.getElementById('layerDown').addEventListener('click', () => {
    CanvasManager.changeLayer('down');
  });
  
  document.getElementById('layerUp').addEventListener('click', () => {
    CanvasManager.changeLayer('up');
  });
  
  document.getElementById('layerTop').addEventListener('click', () => {
    CanvasManager.changeLayer('top');
  });
  
  // 元素操作
  document.getElementById('duplicateElement').addEventListener('click', () => {
    CanvasManager.duplicateElement();
  });
  
  document.getElementById('deleteElement').addEventListener('click', () => {
    CanvasManager.deleteElement();
  });
  
  // 添加元素
  document.getElementById('addText').addEventListener('click', () => {
    CanvasManager.addElement('text');
  });
  
  document.getElementById('addImage').addEventListener('click', () => {
    CanvasManager.addElement('image');
  });
  
  document.getElementById('addSticker').addEventListener('click', () => {
    CanvasManager.addElement('sticker');
  });
  
  // 批量生成
  document.getElementById('toggleBatch').addEventListener('click', () => {
    DOM.batchSection.classList.toggle('collapsed');
  });
  
  document.getElementById('addBatchRow').addEventListener('click', () => {
    BatchManager.addBatchRow();
  });
  
  document.getElementById('clearBatch').addEventListener('click', () => {
    if (confirm('确定要清空所有批量数据吗？')) {
      BatchManager.clearBatchData();
    }
  });
  
  document.getElementById('importCSV').addEventListener('click', () => {
    document.getElementById('csvInput').click();
  });
  
  document.getElementById('csvInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      BatchManager.importCSV(file);
    }
  });
  
  document.getElementById('batchGenerate').addEventListener('click', () => {
    BatchManager.batchGenerate();
  });
  
  document.getElementById('batchExport').addEventListener('click', () => {
    ExportManager.batchExport();
  });
  
  // 保存模板
  document.getElementById('saveTemplate').addEventListener('click', () => {
    if (!AppState.currentTemplate) {
      alert('请先选择一个模板');
      return;
    }
    DOM.saveModal.classList.add('active');
    document.getElementById('templateName').value = AppState.currentTemplate.name;
  });
  
  document.getElementById('closeSaveModal').addEventListener('click', () => {
    DOM.saveModal.classList.remove('active');
  });
  
  document.getElementById('cancelSave').addEventListener('click', () => {
    DOM.saveModal.classList.remove('active');
  });
  
  document.getElementById('confirmSave').addEventListener('click', () => {
    const name = document.getElementById('templateName').value.trim();
    if (!name) {
      alert('请输入模板名称');
      return;
    }
    TemplateManager.saveAsCustom(name);
    DOM.saveModal.classList.remove('active');
    alert('模板保存成功！');
  });
  
  // 导出图片
  document.getElementById('exportImage').addEventListener('click', () => {
    if (!AppState.currentTemplate) {
      alert('请先选择一个模板');
      return;
    }
    DOM.exportModal.classList.add('active');
  });
  
  document.getElementById('closeExportModal').addEventListener('click', () => {
    DOM.exportModal.classList.remove('active');
  });
  
  document.getElementById('cancelExport').addEventListener('click', () => {
    DOM.exportModal.classList.remove('active');
  });
  
  // 导出设置
  document.querySelectorAll('[data-format]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-format]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.exportFormat = btn.dataset.format;
    });
  });
  
  document.getElementById('exportQuality').addEventListener('input', () => {
    const value = document.getElementById('exportQuality').value;
    AppState.exportQuality = parseFloat(value);
    document.getElementById('qualityValue').textContent = Math.round(value * 100) + '%';
  });
  
  document.getElementById('exportScale').addEventListener('input', () => {
    const value = document.getElementById('exportScale').value;
    AppState.exportScale = parseFloat(value);
    const width = Math.round(1080 * value);
    const height = Math.round(1440 * value);
    document.getElementById('scaleValue').textContent = `${value}x (${width}x${height})`;
  });
  
  document.getElementById('confirmExport').addEventListener('click', async () => {
    DOM.exportModal.classList.remove('active');
    await ExportManager.exportSingle();
  });
  
  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    // Delete 删除元素
    if (e.key === 'Delete' && AppState.selectedElement) {
      CanvasManager.deleteElement();
    }
    
    // Ctrl/Cmd + S 保存
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      document.getElementById('saveTemplate').click();
    }
    
    // Ctrl/Cmd + E 导出
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      document.getElementById('exportImage').click();
    }
    
    // 方向键微调位置
    if (AppState.selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      const element = AppState.selectedElement;
      
      switch (e.key) {
        case 'ArrowUp': element.y -= step; break;
        case 'ArrowDown': element.y += step; break;
        case 'ArrowLeft': element.x -= step; break;
        case 'ArrowRight': element.x += step; break;
      }
      
      const node = DOM.cardCanvas.querySelector(`[data-element-id="${element.id}"]`);
      if (node) {
        node.style.left = element.x + 'px';
        node.style.top = element.y + 'px';
      }
      
      DOM.posX.value = element.x;
      DOM.posY.value = element.y;
    }
  });
}

// ========================================
// 初始化应用
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // 初始化 DOM 引用
  DOM.init();
  
  // 初始化应用状态
  AppState.init();
  
  // 初始化缩放管理
  ZoomManager.init();
  
  // 渲染预设模板
  TemplateManager.renderPresetTemplates('note');
  
  // 渲染自定义模板
  TemplateManager.renderCustomTemplates();
  
  // 绑定事件
  bindEvents();
  
  // 加载默认模板
  TemplateManager.loadTemplate('note-xhs-1', 'preset');
  
  console.log('EchoRabbit 小红书卡片生成器已加载');
});
