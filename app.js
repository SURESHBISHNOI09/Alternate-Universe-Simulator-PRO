// Enhanced Application Data for PRO version
const APP_DATA = {
  samplePrompts: [
    "What if social media was run by cats?",
    "What if pizza delivery was done by teleportation?",
    "What if gravity worked backwards?",
    "What if phones grew on trees?",
    "What if time moved backwards on weekends?",
    "What if clouds were made of cotton candy?",
    "What if everyone could fly but only on Tuesdays?",
    "What if books could talk back to their readers?",
    "What if coffee shops were run by dinosaurs?",
    "What if elevators went sideways instead of up?",
    "What if rain was made of glitter?",
    "What if cars ran on laughter?"
  ],
  
  memeTemplates: [
    {
      name: "Drake Pointing",
      description: "Classic Drake meme with pointing gesture",
      usage: "Before/After or Yes/No comparisons"
    },
    {
      name: "Distracted Boyfriend", 
      description: "Person looking at another option meme",
      usage: "Choosing between options"
    },
    {
      name: "This Is Fine",
      description: "Dog in burning room saying everything is fine",
      usage: "Ironic situations"
    },
    {
      name: "Galaxy Brain",
      description: "Expanding brain meme with multiple levels", 
      usage: "Progressive revelation of ideas"
    },
    {
      name: "Change My Mind",
      description: "Person at table with controversial statement",
      usage: "Challenging popular opinions"
    }
  ],
  
  proSampleResponses: [
    {
      prompt: "What if social media was run by cats?",
      headline: "Instagram Introduces 'Purr-fect Posts' Algorithm Update",
      article: "In a groundbreaking announcement that has content creators scrambling to adapt, Instagram's new feline overlords have unveiled their latest algorithm update: 'Purr-fect Posts.' The change prioritizes content featuring sunny windowsills, cardboard boxes, and anything that can be knocked off a table.\n\n'Meow meow purr,' stated CEO Whiskers McFluffington during a press conference held in a giant cardboard box. The announcement was interpreted by human staff as 'Quality content must now include at least three cat-approved elements: warmth, comfort, and the potential for mischief.'\n\nThe update has already shown dramatic results. Food influencers are now required to push their carefully arranged dishes off counters for maximum engagement, while travel bloggers must include at least one sunny spot perfect for napping in every post.\n\nEarly adopters report engagement rates increasing by 400%, though comments are now limited to 'meow,' 'purr,' and various hissing sounds. The dislike button has been replaced with a 'hairball' reaction, which users are still learning to interpret.",
      memeContent: {
        template: "Drake Pointing",
        topText: "Traditional social media algorithms",
        bottomText: "Cat-approved content algorithms",
        description: "Drake disapproving of traditional algorithms, then pointing approvingly at cat-approved content with sunny windowsills and cardboard boxes"
      },
      socialPost: "🐱 BREAKING: Cats have taken over social media and honestly... the algorithm makes more sense now. Sunny windowsill content is UP 400%! #CatAlgorithm #PurrfectPosts #SocialMediaTakeover",
      imageDescription: "A boardroom full of cats wearing tiny business suits, with one orange tabby CEO presenting a chart showing engagement metrics for cardboard box content"
    },
    {
      prompt: "What if pizza delivery was done by teleportation?",
      headline: "TelePort Pizza Reports 'Slight Mixing Issue' with Interdimensional Deliveries",
      article: "TelePort Pizza, the world's first interdimensional food delivery service, issued an apology today after several customers received pizzas from parallel universes where pineapple is considered the only acceptable topping.\n\n'We're working around the clock to recalibrate our quantum delivery portals,' explained Chief Teleportation Officer Dr. Sarah Pepperoni. 'Unfortunately, our delivery drivers accidentally tapped into Universe-847B, where pineapple pizza achieved world peace in 1987.'\n\nThe mix-up began Tuesday when customers in downtown areas started receiving pizzas with toppings they didn't order, including some that don't exist in our reality. Reports include 'crystallized moonbeam cheese,' 'inverted pepperoni that tastes like tomorrow,' and disturbingly, 'pizza that delivers itself before you order it.'\n\nThe company's stock jumped 300% after investors realized the implications of accessing pizza from universes where calories don't exist. However, health officials warn that eating interdimensional food may cause temporary ability to see through time, though side effects typically fade after 30 minutes.",
      memeContent: {
        template: "This Is Fine",
        topText: "When your pizza arrives from a parallel universe",
        bottomText: "Where pineapple is the only topping",
        description: "Dog sitting calmly while interdimensional pizza portals open around him, with various impossible pizza combinations floating through the air"
      },
      socialPost: "🍕✨ Just got my pizza delivered via TELEPORTATION and somehow received a slice that tastes like next Tuesday. Technology is amazing and terrifying. #TeleportPizza #InterdimensionalEats #FutureFood",
      imageDescription: "A glowing purple portal in someone's living room with a pizza floating through it, while the confused customer holds a slice that's shimmering with otherworldly energy"
    }
  ],
  
  shareMessages: [
    "Check out this wild alternate universe scenario I generated! 🌍✨",
    "Just discovered what would happen if... 🤯", 
    "The multiverse is stranger than fiction! 🚀",
    "AI just blew my mind with this alternate reality! 🧠⚡",
    "This alternate universe generator is incredible! 🌌",
    "Found my new favorite 'what if' scenario! 💫"
  ]
};

// User State Management
const UserState = {
  tier: 'free', // free, pro, enterprise
  dailyUsage: parseInt(localStorage.getItem('dailyUsage') || '0'),
  lastUsageDate: localStorage.getItem('lastUsageDate') || new Date().toDateString(),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  preferences: JSON.parse(localStorage.getItem('preferences') || '{}')
};

// Usage Limits
const USAGE_LIMITS = {
  free: 5,
  pro: Infinity,
  enterprise: Infinity
};

// Application State
let currentResponse = null;
let isGenerating = false;
let progressInterval = null;

// DOM Elements - Initialize after DOM loads
let elements = {};

// Initialize Application
function init() {
  // Initialize DOM elements
  elements = {
    themeToggle: document.getElementById('themeToggle'),
    promptInput: document.getElementById('promptInput'),
    generateBtn: document.getElementById('generateBtn'),
    examplesGrid: document.getElementById('examplesGrid'),
    contentTypes: document.getElementById('contentTypes'),
    resultsSection: document.getElementById('resultsSection'),
    progress: document.getElementById('progress'),
    progressFill: document.getElementById('progressFill'),
    content: document.getElementById('content'),
    
    // Content sections
    generatedHeadline: document.getElementById('generatedHeadline'),
    generatedArticle: document.getElementById('generatedArticle'),
    memeContainer: document.getElementById('memeContainer'),
    memeTopText: document.getElementById('memeTopText'),
    memeBottomText: document.getElementById('memeBottomText'),
    memeDescription: document.getElementById('memeDescription'),
    socialContent: document.getElementById('socialContent'),
    
    // Progress items
    progressItems: {
      headline: document.getElementById('progressHeadline'),
      article: document.getElementById('progressArticle'), 
      meme: document.getElementById('progressMeme'),
      social: document.getElementById('progressSocial')
    },
    
    // Actions
    generateNewBtn: document.getElementById('generateNewBtn'),
    saveBtn: document.getElementById('saveBtn'),
    exportBtn: document.getElementById('exportBtn'),
    shareAllBtn: document.getElementById('shareAllBtn'),
    
    // User interface
    userTier: document.getElementById('userTier'),
    upgradeBtn: document.getElementById('upgradeBtn'),
    
    // Modals
    pricingModal: document.getElementById('pricingModal'),
    limitModal: document.getElementById('limitModal'),
    modalBackdrop: document.getElementById('modalBackdrop'),
    modalClose: document.getElementById('modalClose'),
    
    // Notification
    notification: document.getElementById('notification')
  };

  setupThemeToggle();
  setupUserInterface();
  setupExamplePrompts();
  setupEventListeners();
  setupKeyboardShortcuts();
  checkDailyUsageReset();
  updateUserTierDisplay();
}

// Theme Management
function setupThemeToggle() {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
  } else if (systemDark) {
    document.documentElement.setAttribute('data-color-scheme', 'dark');
  }
  
  updateThemeIcon();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const icon = elements.themeToggle?.querySelector('.theme-toggle__icon');
  if (icon) {
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

// User Interface Setup
function setupUserInterface() {
  // Setup content type checkboxes for Pro features
  if (elements.contentTypes) {
    const contentTypeInputs = elements.contentTypes.querySelectorAll('input[type="checkbox"]');
    contentTypeInputs.forEach(input => {
      if (input.value !== 'article' && UserState.tier === 'free') {
        input.disabled = true;
        const option = input.closest('.content-type-option');
        if (option) option.style.opacity = '0.6';
      }
      
      input.addEventListener('change', handleContentTypeChange);
    });
  }
}

function handleContentTypeChange(event) {
  const input = event.target;
  if (input.disabled && UserState.tier === 'free') {
    input.checked = false;
    showUpgradeModal();
  }
}

function updateUserTierDisplay() {
  if (!elements.userTier) return;
  
  const tierBadge = elements.userTier.querySelector('.tier-badge');
  const tierUsage = elements.userTier.querySelector('.tier-usage');
  
  if (tierBadge && tierUsage) {
    if (UserState.tier === 'free') {
      tierBadge.textContent = 'FREE';
      tierBadge.className = 'tier-badge tier-badge--free';
      tierUsage.textContent = `${UserState.dailyUsage}/${USAGE_LIMITS.free} uses today`;
    } else {
      tierBadge.textContent = 'PRO';
      tierBadge.className = 'tier-badge tier-badge--pro';
      tierUsage.textContent = 'Unlimited';
    }
  }
}

function checkDailyUsageReset() {
  const today = new Date().toDateString();
  if (UserState.lastUsageDate !== today) {
    UserState.dailyUsage = 0;
    UserState.lastUsageDate = today;
    localStorage.setItem('dailyUsage', '0');
    localStorage.setItem('lastUsageDate', today);
  }
}

// Example Prompts
function setupExamplePrompts() {
  if (!elements.examplesGrid) return;
  
  elements.examplesGrid.innerHTML = '';
  
  // Shuffle and take 8 random prompts
  const shuffled = [...APP_DATA.samplePrompts].sort(() => 0.5 - Math.random());
  const selectedPrompts = shuffled.slice(0, 8);
  
  selectedPrompts.forEach(prompt => {
    const chip = document.createElement('button');
    chip.className = 'example-chip';
    chip.textContent = prompt;
    chip.addEventListener('click', () => {
      if (elements.promptInput) {
        elements.promptInput.value = prompt;
        elements.promptInput.focus();
        // Add sparkle effect
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => {
          chip.style.transform = '';
        }, 150);
      }
    });
    elements.examplesGrid.appendChild(chip);
  });
}

// Event Listeners
function setupEventListeners() {
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }
  if (elements.generateBtn) {
    elements.generateBtn.addEventListener('click', handleGenerate);
  }
  if (elements.promptInput) {
    elements.promptInput.addEventListener('keypress', handleInputKeypress);
    elements.promptInput.addEventListener('input', handleInputChange);
  }
  
  // Action buttons
  if (elements.generateNewBtn) {
    elements.generateNewBtn.addEventListener('click', handleGenerateNew);
  }
  if (elements.saveBtn) {
    elements.saveBtn.addEventListener('click', handleSaveFavorite);
  }
  if (elements.exportBtn) {
    elements.exportBtn.addEventListener('click', handleExport);
  }
  if (elements.shareAllBtn) {
    elements.shareAllBtn.addEventListener('click', handleShareAll);
  }
  
  // Upgrade and modal handling
  if (elements.upgradeBtn) {
    elements.upgradeBtn.addEventListener('click', showUpgradeModal);
  }
  if (elements.modalClose) {
    elements.modalClose.addEventListener('click', hideModals);
  }
  if (elements.modalBackdrop) {
    elements.modalBackdrop.addEventListener('click', hideModals);
  }
  
  // Copy and share buttons for individual content
  document.addEventListener('click', handleActionButtons);
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleGenerate();
    }
    if (e.key === 't' && e.ctrlKey) {
      e.preventDefault();
      toggleTheme();
    }
    if (e.key === 'Escape') {
      hideModals();
    }
  });
}

// Input Handling
function handleInputChange() {
  const value = elements.promptInput?.value?.trim() || '';
  if (elements.generateBtn) {
    elements.generateBtn.disabled = value.length === 0;
  }
}

function handleInputKeypress(e) {
  if (e.key === 'Enter' && !isGenerating) {
    handleGenerate();
  }
}

// Content Generation
async function handleGenerate() {
  const prompt = elements.promptInput?.value?.trim();
  
  if (!prompt || isGenerating) return;
  
  // Check usage limits
  if (UserState.tier === 'free' && UserState.dailyUsage >= USAGE_LIMITS.free) {
    showLimitModal();
    return;
  }
  
  isGenerating = true;
  showLoadingState();
  
  try {
    const response = await generateContent(prompt);
    await showGeneratedContent(response);
    
    // Update usage
    UserState.dailyUsage++;
    localStorage.setItem('dailyUsage', UserState.dailyUsage.toString());
    updateUserTierDisplay();
    
  } catch (error) {
    console.error('Generation error:', error);
    showNotification('Failed to generate content. Please try again.', 'error');
  } finally {
    isGenerating = false;
    hideLoadingState();
  }
}

function showLoadingState() {
  if (elements.generateBtn) {
    elements.generateBtn.classList.add('loading');
  }
  if (elements.resultsSection) {
    elements.resultsSection.classList.add('visible');
  }
  if (elements.progress) {
    elements.progress.style.display = 'block';
  }
  if (elements.content) {
    elements.content.classList.remove('visible');
  }
  
  // Reset progress items
  Object.values(elements.progressItems).forEach(item => {
    if (item) {
      item.classList.remove('active', 'completed');
    }
  });
  
  // Reset progress bar
  if (elements.progressFill) {
    elements.progressFill.style.width = '0%';
  }
  
  // Smooth scroll to results
  setTimeout(() => {
    if (elements.resultsSection) {
      elements.resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, 300);
}

function hideLoadingState() {
  if (elements.generateBtn) {
    elements.generateBtn.classList.remove('loading');
  }
}

async function generateContent(prompt) {
  // Check if we have a predefined response for this prompt
  let response = APP_DATA.proSampleResponses.find(r => 
    r.prompt.toLowerCase() === prompt.toLowerCase()
  );
  
  if (!response) {
    // Generate dynamic response
    response = generateDynamicResponse(prompt);
  }
  
  currentResponse = { ...response, originalPrompt: prompt };
  return currentResponse;
}

function generateDynamicResponse(prompt) {
  const scenario = prompt.toLowerCase().replace('what if ', '');
  
  const headlines = [
    `Breaking: ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Changes Everything Worldwide`,
    `Scientists Confirm: ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Now Reality Everywhere`,
    `World Adapts as ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Becomes New Normal`,
    `Global Alert: The Day ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Actually Happened`,
    `Revolutionary Discovery: ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Transforms Society`
  ];
  
  const memeTemplates = [
    {
      template: "Drake Pointing",
      topText: "Life before " + scenario,
      bottomText: "Life after " + scenario,
      description: `Drake disapproving of normal life, then enthusiastically pointing at the new reality where ${scenario}`
    },
    {
      template: "This Is Fine",
      topText: "Everything is completely normal",
      bottomText: "Nothing to see here",
      description: `Person sitting calmly while chaos ensues around them due to ${scenario}`
    },
    {
      template: "Galaxy Brain",
      topText: "Regular reality",
      bottomText: "Reality where " + scenario,
      description: `Progressive brain expansion showing the evolution from normal reality to the amazing world where ${scenario}`
    }
  ];
  
  const socialPosts = [
    `🚨 BREAKING: Just witnessed ${scenario} and I can't even... This changes EVERYTHING! #AlternateReality #MindBlown #WhatIf`,
    `Okay but imagine if ${scenario} 🤯 The world would be so different! Who else thinks this would be amazing? #AlternateUniverse #ThoughtExperiment`,
    `POV: You wake up in a world where ${scenario} ✨ Would you love it or hate it? Drop your thoughts below! #AlternateReality #DeepThoughts`,
    `Scientists hate this one weird trick: ${scenario} 😂 But seriously, this alternate universe is wild! #ScienceFiction #AlternateWorld`
  ];
  
  const selectedMeme = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
  const selectedSocialPost = socialPosts[Math.floor(Math.random() * socialPosts.length)];
  
  return {
    prompt: prompt,
    headline: headlines[Math.floor(Math.random() * headlines.length)],
    article: generateDynamicArticle(prompt, scenario),
    memeContent: selectedMeme,
    socialPost: selectedSocialPost,
    imageDescription: generateImageDescription(scenario)
  };
}

function generateDynamicArticle(prompt, scenario) {
  const starters = [
    `In a shocking turn of events that has left experts scrambling for explanations, the world woke up today to discover that ${scenario}.`,
    `What started as a hypothetical question has become reality, as reports pour in from around the globe confirming that ${scenario}.`,
    `In an unprecedented development that has captured international attention, scientists have verified that ${scenario}.`
  ];
  
  const middles = [
    `\n\nGovernment officials have called an emergency session to address the situation, with world leaders announcing new task forces dedicated to managing the implications of this unprecedented change. Social media is buzzing with videos and stories of how people are adapting to this new reality.\n\n"It's unlike anything we've ever seen in recorded history," commented Dr. Sarah Johnson, a leading sociologist at Harvard University. "The human capacity for adaptation continues to amaze us, but this is testing our limits in fascinating ways."`,
    
    `\n\nThe phenomenon appears to have started simultaneously across multiple time zones, suggesting a coordinated global event that defies current scientific understanding. Emergency services report they are handling the situation with unprecedented cooperation and creative problem-solving.\n\n"This changes everything we thought we knew about physics, society, and reality itself," explained Professor Michael Chen from MIT. "We're essentially rewriting textbooks in real-time while living through the biggest paradigm shift in human history."`
  ];
  
  const endings = [
    `\n\nLocal businesses are already pivoting their services to accommodate the change, while economists debate the long-term implications for global markets. Despite initial chaos, many residents report a sense of wonder and excitement about the possibilities this new reality presents.\n\nAs one local resident put it: "Sure, it's completely crazy, but honestly? Life was getting pretty boring anyway."`,
    
    `\n\nSchools and businesses have announced temporary adaptations as communities work together to understand their new circumstances. Meanwhile, researchers are working around the clock to study the implications and develop new frameworks for this reality.\n\nEarly surveys show that 73% of the population is "cautiously optimistic" about the change, with many expressing that this alternate reality might actually be an improvement over the old one.`
  ];
  
  const starter = starters[Math.floor(Math.random() * starters.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  
  return starter + middle + ending;
}

function generateImageDescription(scenario) {
  const descriptions = [
    `A surreal, vibrant scene showing people joyfully adapting to life where ${scenario}, with a mix of chaos and wonder in the background`,
    `A split-screen comparison showing normal life on the left and the amazing new reality where ${scenario} on the right, highlighting the dramatic transformation`,
    `A news reporter standing in the middle of a bustling scene where ${scenario}, looking amazed while people in the background are embracing the change`,
    `An aerial view of a city where ${scenario}, showing how architecture, transportation, and daily life have all adapted to this new reality`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

async function showGeneratedContent(response) {
  let progress = 0;
  const increment = 25;
  
  // Get selected content types
  const selectedTypes = [];
  if (elements.contentTypes) {
    const checkboxes = elements.contentTypes.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(input => selectedTypes.push(input.value));
  }
  
  // Default to article if nothing selected
  if (selectedTypes.length === 0) {
    selectedTypes.push('article');
  }
  
  // Show headline and article first
  if (selectedTypes.includes('article')) {
    await simulateProgress('headline', 1500);
    if (elements.generatedHeadline) {
      elements.generatedHeadline.textContent = response.headline;
    }
    const articleSection = document.getElementById('articleSection');
    if (articleSection) {
      articleSection.classList.add('visible');
    }
    progress += increment;
    if (elements.progressFill) {
      elements.progressFill.style.width = progress + '%';
    }
    
    await simulateProgress('article', 2000);
    if (elements.generatedArticle) {
      elements.generatedArticle.innerHTML = formatArticle(response.article);
    }
    progress += increment;
    if (elements.progressFill) {
      elements.progressFill.style.width = progress + '%';
    }
  }
  
  // Show meme content
  if (selectedTypes.includes('meme') && response.memeContent) {
    await simulateProgress('meme', 1800);
    displayMemeContent(response.memeContent);
    const memeSection = document.getElementById('memeSection');
    if (memeSection) {
      memeSection.classList.add('visible');
    }
    progress += increment;
    if (elements.progressFill) {
      elements.progressFill.style.width = progress + '%';
    }
  }
  
  // Show social media post
  if (selectedTypes.includes('social') && response.socialPost) {
    await simulateProgress('social', 1200);
    if (elements.socialContent) {
      elements.socialContent.textContent = response.socialPost;
    }
    const socialSection = document.getElementById('socialSection');
    if (socialSection) {
      socialSection.classList.add('visible');
    }
    progress += increment;
    if (elements.progressFill) {
      elements.progressFill.style.width = progress + '%';
    }
  }
  
  // Complete progress
  if (elements.progressFill) {
    elements.progressFill.style.width = '100%';
  }
  
  // Show actions section
  await new Promise(resolve => setTimeout(resolve, 500));
  const actionsSection = document.getElementById('actionsSection');
  if (actionsSection) {
    actionsSection.classList.add('visible');
  }
  
  // Hide progress, show content
  setTimeout(() => {
    if (elements.progress) {
      elements.progress.style.display = 'none';
    }
    if (elements.content) {
      elements.content.classList.add('visible');
    }
  }, 1000);
}

async function simulateProgress(step, duration) {
  const item = elements.progressItems[step];
  if (!item) return;
  
  item.classList.add('active');
  
  await new Promise(resolve => setTimeout(resolve, duration));
  
  item.classList.remove('active');
  item.classList.add('completed');
}

function displayMemeContent(memeContent) {
  if (elements.memeTopText) {
    elements.memeTopText.textContent = memeContent.topText;
  }
  if (elements.memeBottomText) {
    elements.memeBottomText.textContent = memeContent.bottomText;
  }
  if (elements.memeDescription) {
    elements.memeDescription.textContent = `${memeContent.template}: ${memeContent.description}`;
  }
}

function formatArticle(article) {
  return article.split('\n\n').map(paragraph => 
    `<p>${paragraph}</p>`
  ).join('');
}

// Action Handlers
function handleActionButtons(event) {
  const button = event.target.closest('.action-btn');
  if (!button) return;
  
  const icon = button.querySelector('span')?.textContent;
  
  switch (icon) {
    case '📋':
      copyContent(button);
      break;
    case '🔗':
      shareContent(button);
      break;
    case '💾':
      downloadContent(button);
      break;
    case '🐦':
      shareToTwitter();
      break;
  }
}

function copyContent(button) {
  const contentCard = button.closest('.content-card');
  const headline = contentCard?.querySelector('.content__headline')?.textContent || '';
  const article = contentCard?.querySelector('.content__article')?.textContent || '';
  const social = contentCard?.querySelector('.social-post__content')?.textContent || '';
  
  const textToCopy = headline + '\n\n' + (article || social);
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    showNotification('Content copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('Failed to copy content', 'error');
  });
}

function shareContent(button) {
  if (navigator.share && currentResponse) {
    navigator.share({
      title: currentResponse.headline,
      text: currentResponse.socialPost || 'Check out this amazing alternate universe!',
      url: window.location.href
    });
  } else {
    copyContent(button);
  }
}

function downloadContent(button) {
  if (UserState.tier === 'free') {
    showUpgradeModal();
    return;
  }
  
  // Create downloadable content
  const content = createExportContent();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `alternate-universe-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Content downloaded!', 'success');
}

function shareToTwitter() {
  if (!currentResponse) return;
  
  const tweetText = `${currentResponse.socialPost}\n\n#AlternateUniverse #AI #WhatIf`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  
  window.open(tweetUrl, '_blank');
}

function handleGenerateNew() {
  if (elements.promptInput) {
    elements.promptInput.value = '';
    elements.promptInput.focus();
  }
  if (elements.resultsSection) {
    elements.resultsSection.classList.remove('visible');
  }
  if (elements.content) {
    elements.content.classList.remove('visible');
  }
  
  // Reset content sections
  ['articleSection', 'memeSection', 'socialSection', 'actionsSection'].forEach(id => {
    const section = document.getElementById(id);
    if (section) section.classList.remove('visible');
  });
  
  currentResponse = null;
  
  // Refresh example prompts
  setupExamplePrompts();
}

function handleSaveFavorite() {
  if (!currentResponse) return;
  
  const favorite = {
    id: Date.now(),
    prompt: currentResponse.originalPrompt,
    headline: currentResponse.headline,
    date: new Date().toISOString()
  };
  
  UserState.favorites.push(favorite);
  localStorage.setItem('favorites', JSON.stringify(UserState.favorites));
  
  showNotification('Saved to favorites!', 'success');
}

function handleExport() {
  if (UserState.tier === 'free') {
    showUpgradeModal();
    return;
  }
  
  const content = createExportContent();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `universe-export-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Universe exported!', 'success');
}

function handleShareAll() {
  if (navigator.share && currentResponse) {
    navigator.share({
      title: 'Alternate Universe Simulator',
      text: `Check out this amazing alternate universe: "${currentResponse.headline}"`,
      url: window.location.href
    });
  } else {
    // Fallback to copying URL
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification('Link copied to clipboard!', 'success');
    });
  }
}

function createExportContent() {
  if (!currentResponse) return '';
  
  let content = `ALTERNATE UNIVERSE SIMULATION\n`;
  content += `Generated: ${new Date().toLocaleString()}\n`;
  content += `Prompt: ${currentResponse.originalPrompt}\n\n`;
  content += `HEADLINE:\n${currentResponse.headline}\n\n`;
  content += `ARTICLE:\n${currentResponse.article}\n\n`;
  
  if (currentResponse.memeContent) {
    content += `MEME:\n`;
    content += `Template: ${currentResponse.memeContent.template}\n`;
    content += `Top Text: ${currentResponse.memeContent.topText}\n`;
    content += `Bottom Text: ${currentResponse.memeContent.bottomText}\n`;
    content += `Description: ${currentResponse.memeContent.description}\n\n`;
  }
  
  if (currentResponse.socialPost) {
    content += `SOCIAL MEDIA POST:\n${currentResponse.socialPost}\n\n`;
  }
  
  content += `---\nGenerated by Alternate Universe Simulator PRO\nCrafted with passion by a creative developer\n`;
  
  return content;
}

// Modal Management
function showUpgradeModal() {
  if (elements.pricingModal) {
    elements.pricingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function showLimitModal() {
  if (elements.limitModal) {
    elements.limitModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function hideModals() {
  if (elements.pricingModal) {
    elements.pricingModal.classList.add('hidden');
  }
  if (elements.limitModal) {
    elements.limitModal.classList.add('hidden');
  }
  document.body.style.overflow = '';
}

// Notifications
function showNotification(message, type = 'success') {
  if (!elements.notification) return;
  
  const icon = elements.notification.querySelector('.notification__icon');
  const text = elements.notification.querySelector('.notification__text');
  
  if (icon && text) {
    // Set icon based on type
    icon.textContent = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    text.textContent = message;
    
    // Set color based on type
    if (type === 'error') {
      elements.notification.style.background = 'var(--color-error)';
    } else if (type === 'warning') {
      elements.notification.style.background = 'var(--color-warning)';
    } else {
      elements.notification.style.background = 'var(--color-success)';
    }
    
    elements.notification.classList.add('show');
    
    setTimeout(() => {
      elements.notification.classList.remove('show');
    }, 3000);
  }
}

// Performance and Utilities
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Upgrade simulation (for demo purposes)
function simulateUpgrade() {
  UserState.tier = 'pro';
  updateUserTierDisplay();
  
  // Enable all content types
  if (elements.contentTypes) {
    const inputs = elements.contentTypes.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => {
      input.disabled = false;
      const option = input.closest('.content-type-option');
      if (option) option.style.opacity = '1';
    });
  }
  
  hideModals();
  showNotification('Upgraded to PRO! Enjoy unlimited generations!', 'success');
}

// Add upgrade button functionality
document.addEventListener('DOMContentLoaded', () => {
  const upgradeButtons = document.querySelectorAll('.upgrade-tier-btn, .upgrade-btn');
  upgradeButtons.forEach(btn => {
    btn.addEventListener('click', simulateUpgrade);
  });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations if needed
  } else {
    // Resume animations
  }
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('Application error:', e);
  showNotification('Something went wrong. Please refresh and try again.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e);
  showNotification('Something went wrong. Please refresh and try again.', 'error');
});