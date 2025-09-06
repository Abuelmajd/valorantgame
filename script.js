// بيانات اللعبة
const gameData = {
    agents: [
        { 
            name: "Jett", 
            image: "jett.png", 
            quotes: ["Let's go!", "Up we go!", "Let's get moving!", "You seeing this?"], 
            bio: "خبيرة في الحركة والسرعة",
            description: "عميلة كورية جنوبية متخصصة في الحركة السريعة والقدرات الهوائية",
            abilities: ["Tailwind", "Updraft", "Cloudburst", "Blade Storm"],
            role: "دويلست"
        },
        { 
            name: "Phoenix", 
            image: "phoenix.png", 
            quotes: ["Hot hands!", "Feel the heat!", "I'm on fire!", "Let's burn!"], 
            bio: "متخصص في الهجمات النارية",
            description: "عميل بريطاني يستخدم النار في الهجوم والشفاء الذاتي",
            abilities: ["Curveball", "Hot Hands", "Blaze", "Run It Back"],
            role: "دويلست"
        },
        { 
            name: "Sage", 
            image: "sage.png", 
            quotes: ["Healing you now.", "I will protect you.", "Stay together!", "Safety first!"], 
            bio: "عالمة في الشفاء والحماية",
            description: "عميلة صينية قادرة على الشفاء وإعادة الحياة",
            abilities: ["Barrier Orb", "Slow Orb", "Healing Orb", "Resurrection"],
            role: "سينتينل"
        },
        { 
            name: "Sova", 
            image: "sova.png", 
            quotes: ["I have the shot.", "Recon bolt out!", "Enemy spotted!", "Hunter's fury!"], 
            bio: "خبير في التتبع والاستطلاع",
            description: "عميل روسي يستخدم أسهم الكشف والصواريخ الموجهة",
            abilities: ["Owl Drone", "Shock Bolt", "Recon Bolt", "Hunter's Fury"],
            role: "إينيشياتور"
        },
        { 
            name: "Brimstone", 
            image: "brimstone.png", 
            quotes: ["Orbital strike incoming!", "Fire in the hole!", "Covering fire!", "Mission complete!"], 
            bio: "قائد دعم جوي",
            description: "عميل أمريكي يوفر دعمًا جويًا بالقنابل الدخانية",
            abilities: ["Incendiary", "Stim Beacon", "Sky Smoke", "Orbital Strike"],
            role: "كونترولر"
        },
        { 
            name: "Cypher", 
            image: "cypher.png", 
            quotes: ["I see you.", "Trap wire set.", "Camera watching.", "Neural theft!"], 
            bio: "خبير المراقبة والكمائن",
            description: "عميل مغربي متخصص في المراقبة والكمائن الإلكترونية",
            abilities: ["Trapwire", "Cyber Cage", "Spycam", "Neural Theft"],
            role: "سينتينل"
        }
    ],
    maps: [
        { 
            name: "Haven", 
            image: "haven.png", 
            fact: "تحتوي على 3 مواقع للقنابل",
            description: "خريطة فريدة بثلاث مواقع للقنابل بدلاً من اثنتين",
            callouts: ["A Long", "A Site", "B Site", "C Site", "C Long", "Mid"],
            features: ["3 Spike Sites", "No Mid Doors", "Multiple Choke Points"]
        },
        { 
            name: "Bind", 
            fact: "لا تحتوي على مناطق وسطى",
            image: "bind.png",
            description: "خريطة بدون مناطق وسطى مع أنفاق متحركة",
            callouts: ["A Site", "B Site", "Hookah", "Showers", "Market", "U-Haul"],
            features: ["Teleporters", "No Mid Area", "Tight Corridors"]
        },
        { 
            name: "Split", 
            image: "split.png", 
            fact: "مصممة على هيكلين منفصلين",
            description: "خريطة منفصلة إلى جزأين بمصاعد متحركة",
            callouts: ["A Site", "B Site", "Mid", "Heaven", "Rafters", "Sewer"],
            features: ["Elevators", "Rope Ascenders", "Two Separate Areas"]
        },
        { 
            name: "Ascent", 
            image: "ascent.png", 
            fact: "تضم بوابة قابلة للفتح والإغلاق",
            description: "خريطة إيطالية ببوابة قابلة للفتح والإغلاق",
            callouts: ["A Site", "B Site", "Mid", "Market", "Tree", "Heaven"],
            features: ["Openable Door", "Multiple Levels", "Open Areas"]
        },
        { 
            name: "Icebox", 
            image: "icebox.png", 
            fact: "تحتوي على زلاجات متحركة",
            description: "خريطة قطبية بزلاجات متحركة للتنقل السريع",
            callouts: ["A Site", "B Site", "Mid", "Kitchen", "Belt", "Nest"],
            features: ["Ziplines", "Snow Effects", "Verticality"]
        },
        { 
            name: "Breeze", 
            image: "breeze.png", 
            fact: "مبنية على جزيرة استوائية",
            description: "خريطة استوائية واسعة مع ممرات مفتوحة",
            callouts: ["A Site", "B Site", "Mid", "Pyramid", "Cave", "Tunnel"],
            features: ["Open Areas", "Mechanical Door", "Long Sightlines"]
        }
    ],
    currentQuestion: {},
    score: 0,
    level: 1,
    timer: 30,
    ultUsed: false,
    // نظام تتبع الأسئلة المستخدمة
    usedQuestions: {
        'agent-quote': [],
        'agent-bio': [],
        'agent-ability': [],
        'agent-role': [],
        'map-fact': [],
        'map-callout': [],
        'map-feature': []
    }
};

// عناصر DOM
const elements = {
    questionIcon: document.getElementById('question-icon'),
    questionText: document.getElementById('question-text'),
    choices: document.getElementById('choices'),
    ultButton: document.getElementById('ult-button'),
    score: document.getElementById('score'),
    level: document.getElementById('level'),
    timer: document.getElementById('timer'),
    particleContainer: document.getElementById('particle-container'),
    gameContainer: document.querySelector('.game-container'),
    answerReveal: document.getElementById('answer-reveal'),
    answerImage: document.getElementById('answer-image'),
    answerTitle: document.getElementById('answer-title'),
    answerDescription: document.getElementById('answer-description')
};

// تحديد الصعوبة حسب المستوى
function getDifficultySettings() {
    const level = gameData.level;
    
    // عدد الاختيارات
    let numChoices = 4;
    if (level >= 5 && level < 10) {
        numChoices = 5;
    } else if (level >= 10) {
        numChoices = 6;
    }
    
    // الوقت المسموح به
    let timeLimit = 30;
    if (level >= 3 && level < 7) {
        timeLimit = 25;
    } else if (level >= 7 && level < 12) {
        timeLimit = 20;
    } else if (level >= 12) {
        timeLimit = 15;
    }
    
    // أنواع الأسئلة المتاحة
    let availableTypes = ['agent-quote', 'agent-bio', 'map-fact'];
    if (level >= 4) {
        availableTypes.push('agent-ability');
    }
    if (level >= 6) {
        availableTypes.push('agent-role');
    }
    if (level >= 8) {
        availableTypes.push('map-callout');
    }
    if (level >= 10) {
        availableTypes.push('map-feature');
    }
    
    return { numChoices, timeLimit, availableTypes };
}

// الحصول على الأنواع المتاحة للأسئلة
function getAvailableTypes() {
    const { availableTypes } = getDifficultySettings();
    return availableTypes.filter(type => {
        switch(type) {
            case 'agent-quote':
                return gameData.agents.some((agent, agentIndex) => 
                    agent.quotes.some((quote, quoteIndex) => 
                        !gameData.usedQuestions[type].includes(`agent-quote-${agentIndex}-${quoteIndex}`)
                    )
                );
            case 'agent-bio':
                return gameData.agents.some((agent, agentIndex) => 
                    !gameData.usedQuestions[type].includes(`agent-bio-${agentIndex}`)
                );
            case 'agent-ability':
                return gameData.agents.some((agent, agentIndex) => 
                    agent.abilities.some((ability, abilityIndex) => 
                        !gameData.usedQuestions[type].includes(`agent-ability-${agentIndex}-${abilityIndex}`)
                    )
                );
            case 'agent-role':
                return gameData.agents.some((agent, agentIndex) => 
                    !gameData.usedQuestions[type].includes(`agent-role-${agentIndex}`)
                );
            case 'map-fact':
                return gameData.maps.some((map, mapIndex) => 
                    !gameData.usedQuestions[type].includes(`map-fact-${mapIndex}`)
                );
            case 'map-callout':
                return gameData.maps.some((map, mapIndex) => 
                    map.callouts.some((callout, calloutIndex) => 
                        !gameData.usedQuestions[type].includes(`map-callout-${mapIndex}-${calloutIndex}`)
                    )
                );
            case 'map-feature':
                return gameData.maps.some((map, mapIndex) => 
                    map.features.some((feature, featureIndex) => 
                        !gameData.usedQuestions[type].includes(`map-feature-${mapIndex}-${featureIndex}`)
                    )
                );
        }
    });
}

// الحصول على سؤال متاح لنوع معين
function getAvailableQuestion(type) {
    let availableQuestions = [];
    
    switch(type) {
        case 'agent-quote':
            gameData.agents.forEach((agent, agentIndex) => {
                agent.quotes.forEach((quote, quoteIndex) => {
                    const key = `agent-quote-${agentIndex}-${quoteIndex}`;
                    if (!gameData.usedQuestions[type].includes(key)) {
                        availableQuestions.push({ agent, quote, key });
                    }
                });
            });
            break;
            
        case 'agent-bio':
            gameData.agents.forEach((agent, agentIndex) => {
                const key = `agent-bio-${agentIndex}`;
                if (!gameData.usedQuestions[type].includes(key)) {
                    availableQuestions.push({ agent, key });
                }
            });
            break;
            
        case 'agent-ability':
            gameData.agents.forEach((agent, agentIndex) => {
                agent.abilities.forEach((ability, abilityIndex) => {
                    const key = `agent-ability-${agentIndex}-${abilityIndex}`;
                    if (!gameData.usedQuestions[type].includes(key)) {
                        availableQuestions.push({ agent, ability, key });
                    }
                });
            });
            break;
            
        case 'agent-role':
            gameData.agents.forEach((agent, agentIndex) => {
                const key = `agent-role-${agentIndex}`;
                if (!gameData.usedQuestions[type].includes(key)) {
                    availableQuestions.push({ agent, key });
                }
            });
            break;
            
        case 'map-fact':
            gameData.maps.forEach((map, mapIndex) => {
                const key = `map-fact-${mapIndex}`;
                if (!gameData.usedQuestions[type].includes(key)) {
                    availableQuestions.push({ map, key });
                }
            });
            break;
            
        case 'map-callout':
            gameData.maps.forEach((map, mapIndex) => {
                map.callouts.forEach((callout, calloutIndex) => {
                    const key = `map-callout-${mapIndex}-${calloutIndex}`;
                    if (!gameData.usedQuestions[type].includes(key)) {
                        availableQuestions.push({ map, callout, key });
                    }
                });
            });
            break;
            
        case 'map-feature':
            gameData.maps.forEach((map, mapIndex) => {
                map.features.forEach((feature, featureIndex) => {
                    const key = `map-feature-${mapIndex}-${featureIndex}`;
                    if (!gameData.usedQuestions[type].includes(key)) {
                        availableQuestions.push({ map, feature, key });
                    }
                });
            });
            break;
    }
    
    return availableQuestions.length > 0 
        ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)] 
        : null;
}

// إعادة تعيين الأسئلة المستخدمة
function resetUsedQuestions() {
    gameData.usedQuestions = {
        'agent-quote': [],
        'agent-bio': [],
        'agent-ability': [],
        'agent-role': [],
        'map-fact': [],
        'map-callout': [],
        'map-feature': []
    };
    
    // إظهار رسالة للمستخدم
    const resetDiv = document.createElement('div');
    resetDiv.className = 'reset-message';
    resetDiv.innerHTML = `
        <div class="reset-content">
            <i class="fas fa-redo"></i>
            <h3>تم إعادة تعيين الأسئلة!</h3>
            <p>جميع الأسئلة متاحة مرة أخرى</p>
        </div>
    `;
    document.body.appendChild(resetDiv);
    
    setTimeout(() => {
        resetDiv.remove();
    }, 3000);
}

// إنشاء سؤال عشوائي بدون تكرار
function generateQuestion() {
    // إخفاء منطقة الإجابة السابقة
    elements.answerReveal.classList.remove('show', 'agent-reveal', 'map-reveal');
    setTimeout(() => {
        elements.answerReveal.classList.add('hidden');
    }, 500);
    
    // إزالة الفئات السابقة
    elements.gameContainer.classList.remove('agent-question', 'map-question', 'difficult-question');
    
    // الحصول على الأنواع المتاحة
    let availableTypes = getAvailableTypes();
    let type, questionData;
    
    // إذا لم تكن هناك أنواع متاحة، أعد تعيين الأسئلة
    if (availableTypes.length === 0) {
        resetUsedQuestions();
        availableTypes = getAvailableTypes();
    }
    
    // اختر نوعاً عشوائياً من الأنواع المتاحة
    if (availableTypes.length > 0) {
        type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
        questionData = getAvailableQuestion(type);
        
        // إذا لم نحصل على سؤال (غير متوقع)، أعد تعيين الأسئلة وحاول مرة أخرى
        if (!questionData) {
            resetUsedQuestions();
            availableTypes = getAvailableTypes();
            if (availableTypes.length > 0) {
                type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
                questionData = getAvailableQuestion(type);
            }
        }
    }
    
    // إذا لم نتمكن من الحصول على سؤال حتى بعد إعادة التعيين، استخدم سؤال افتراضي
    if (!questionData) {
        // استخدم أول عميل وأول عبارة كخيار أخير
        questionData = {
            agent: gameData.agents[0],
            quote: gameData.agents[0].quotes[0],
            key: 'agent-quote-0-0'
        };
        type = 'agent-quote';
    }
    
    // الحصول على إعدادات الصعوبة
    const { numChoices, timeLimit } = getDifficultySettings();
    
    // بناء السؤال الحالي
    switch(type) {
        case 'agent-quote':
            gameData.currentQuestion = {
                type: 'agent-quote',
                question: `من يقول هذه العبارة؟ "${questionData.quote}"`,
                answer: questionData.agent.name,
                choices: getRandomChoices(gameData.agents.map(a => a.name), questionData.agent.name, numChoices),
                image: questionData.agent.image,
                description: questionData.agent.description,
                key: questionData.key
            };
            elements.gameContainer.classList.add('agent-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-user-secret"></i>';
            break;
            
        case 'agent-bio':
            gameData.currentQuestion = {
                type: 'agent-bio',
                question: `من هو العميل الذي: "${questionData.agent.bio}"؟`,
                answer: questionData.agent.name,
                choices: getRandomChoices(gameData.agents.map(a => a.name), questionData.agent.name, numChoices),
                image: questionData.agent.image,
                description: questionData.agent.description,
                key: questionData.key
            };
            elements.gameContainer.classList.add('agent-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-user"></i>';
            break;
            
        case 'agent-ability':
            gameData.currentQuestion = {
                type: 'agent-ability',
                question: `لمن هذه القدرة: "${questionData.ability}"؟`,
                answer: questionData.agent.name,
                choices: getRandomChoices(gameData.agents.map(a => a.name), questionData.agent.name, numChoices),
                image: questionData.agent.image,
                description: `${questionData.agent.name}: ${questionData.agent.description}`,
                key: questionData.key
            };
            elements.gameContainer.classList.add('agent-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-magic"></i>';
            break;
            
        case 'agent-role':
            gameData.currentQuestion = {
                type: 'agent-role',
                question: `ما هو دور العميل: "${questionData.agent.name}"؟`,
                answer: questionData.agent.role,
                choices: getRandomChoices(['دويلست', 'سينتينل', 'إينيشياتور', 'كونترولر'], questionData.agent.role, numChoices),
                image: questionData.agent.image,
                description: `${questionData.agent.name}: ${questionData.agent.description}`,
                key: questionData.key
            };
            elements.gameContainer.classList.add('agent-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-shield-alt"></i>';
            break;
            
        case 'map-fact':
            gameData.currentQuestion = {
                type: 'map-fact',
                question: `أي خريطة: "${questionData.map.fact}"؟`,
                answer: questionData.map.name,
                choices: getRandomChoices(gameData.maps.map(m => m.name), questionData.map.name, numChoices),
                image: questionData.map.image,
                description: questionData.map.description,
                key: questionData.key
            };
            elements.gameContainer.classList.add('map-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-map"></i>';
            break;
            
        case 'map-callout':
            gameData.currentQuestion = {
                type: 'map-callout',
                question: `في أي خريطة يوجد هذا الموقع: "${questionData.callout}"؟`,
                answer: questionData.map.name,
                choices: getRandomChoices(gameData.maps.map(m => m.name), questionData.map.name, numChoices),
                image: questionData.map.image,
                description: `${questionData.map.name}: ${questionData.map.description}`,
                key: questionData.key
            };
            elements.gameContainer.classList.add('map-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
            break;
            
        case 'map-feature':
            gameData.currentQuestion = {
                type: 'map-feature',
                question: `أي خريطة تتميز بـ: "${questionData.feature}"؟`,
                answer: questionData.map.name,
                choices: getRandomChoices(gameData.maps.map(m => m.name), questionData.map.name, numChoices),
                image: questionData.map.image,
                description: `${questionData.map.name}: ${questionData.map.description}`,
                key: questionData.key
            };
            elements.gameContainer.classList.add('map-question');
            elements.questionIcon.innerHTML = '<i class="fas fa-star"></i>';
            break;
    }
    
    // إضافة السؤال إلى المستخدمة
    gameData.usedQuestions[type].push(gameData.currentQuestion.key);
    
    // إضافة تأثير صعوبة للمستويات العالية
    if (gameData.level >= 8) {
        elements.gameContainer.classList.add('difficult-question');
    }
    
    displayQuestion(timeLimit);
}

// الحصول على اختيارات عشوائية
function getRandomChoices(allChoices, correctChoice, count) {
    const choices = [correctChoice];
    const otherChoices = allChoices.filter(choice => choice !== correctChoice);
    
    while (choices.length < count && otherChoices.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherChoices.length);
        choices.push(otherChoices[randomIndex]);
        otherChoices.splice(randomIndex, 1);
    }
    
    // خلط الاختيارات
    return choices.sort(() => Math.random() - 0.5);
}

// عرض السؤال
function displayQuestion(timeLimit) {
    // إعادة تعيين المؤقت
    gameData.timer = timeLimit;
    gameData.ultUsed = false;
    elements.ultButton.style.opacity = "1";
    elements.ultButton.disabled = false;
    
    // تحديث النص
    elements.questionText.textContent = gameData.currentQuestion.question;
    
    // إنشاء أزرار الاختيارات
    elements.choices.innerHTML = '';
    gameData.currentQuestion.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(choice);
        elements.choices.appendChild(btn);
    });
    
    // بدء المؤقت
    startTimer();
}

// التحقق من الإجابة
function checkAnswer(selected) {
    clearInterval(window.timerInterval);
    
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        if (btn.textContent === gameData.currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected) {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });
    
    if (selected === gameData.currentQuestion.answer) {
        // حساب النقاط حسب الصعوبة
        const { numChoices, timeLimit } = getDifficultySettings();
        let points = 10;
        
        // نقاط إضافية لزيادة الصعوبة
        if (numChoices > 4) points += 5;
        if (timeLimit < 25) points += 5;
        if (gameData.level >= 10) points += 10;
        
        gameData.score += points;
        elements.score.textContent = gameData.score;
        createParticles();
        
        // عرض الصورة بعد الإجابة الصحيحة
        setTimeout(() => {
            showAnswerReveal();
        }, 500);
        
        // ترقية المستوى
        if (gameData.score >= gameData.level * 50) {
            gameData.level++;
            elements.level.textContent = gameData.level;
            setTimeout(() => {
                showLevelUp();
            }, 1000);
        }
    }
    
    // السؤال التالي بعد 3 ثواني
    setTimeout(() => {
        generateQuestion();
    }, 3000);
}

// عرض الصورة والمعلومات بعد الإجابة
function showAnswerReveal() {
    elements.answerReveal.classList.remove('hidden');
    
    // تعيين الصورة والمعلومات
    elements.answerImage.src = `images/${gameData.currentQuestion.image}`;
    elements.answerImage.alt = gameData.currentQuestion.answer;
    elements.answerTitle.textContent = gameData.currentQuestion.answer;
    elements.answerDescription.textContent = gameData.currentQuestion.description;
    
    // إضافة الفئة المناسبة حسب نوع السؤال
    if (gameData.currentQuestion.type.includes('agent')) {
        elements.gameContainer.classList.add('agent-reveal');
    } else {
        elements.gameContainer.classList.add('map-reveal');
    }
    
    // إظهار المنطقة بتأثير حركي
    setTimeout(() => {
        elements.answerReveal.classList.add('show');
    }, 100);
}

// عرض رسالة ترقية المستوى
function showLevelUp() {
    const levelUpDiv = document.createElement('div');
    levelUpDiv.className = 'level-up';
    levelUpDiv.innerHTML = `
        <div class="level-up-content">
            <i class="fas fa-trophy"></i>
            <h2>ممتاز!</h2>
            <p>لقد وصلت للمستوى ${gameData.level}</p>
            <p class="difficulty-info">${getDifficultyInfo()}</p>
        </div>
    `;
    document.body.appendChild(levelUpDiv);
    
    // إضافة فئة المستوى العالي
    if (gameData.level >= 10) {
        elements.gameContainer.classList.add('high-level');
    }
    
    setTimeout(() => {
        levelUpDiv.remove();
    }, 3000);
}

// الحصول على معلومات الصعوبة
function getDifficultyInfo() {
    const { numChoices, timeLimit, availableTypes } = getDifficultySettings();
    let info = `اختيارات: ${numChoices} | وقت: ${timeLimit}ث`;
    
    if (availableTypes.length > 3) {
        info += ` | أنواع: ${availableTypes.length}`;
    }
    
    return info;
}

// نظام المؤقت
function startTimer() {
    window.timerInterval = setInterval(() => {
        gameData.timer--;
        elements.timer.textContent = gameData.timer;
        
        // تغيير لون المؤقت عند البقاء 5 ثواني أو أقل
        if (gameData.timer <= 5) {
            elements.timer.classList.add('timer-warning');
        } else {
            elements.timer.classList.remove('timer-warning');
        }
        
        if (gameData.timer <= 0) {
            clearInterval(window.timerInterval);
            checkAnswer('');
        }
    }, 1000);
}

// نظام الالتميت
elements.ultButton.addEventListener('click', () => {
    if (!gameData.ultUsed) {
        gameData.ultUsed = true;
        elements.ultButton.style.opacity = "0.3";
        elements.ultButton.disabled = true;
        
        // كشف الإجابة الصحيحة
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            if (btn.textContent === gameData.currentQuestion.answer) {
                btn.style.boxShadow = '0 0 30px #ffff00';
                btn.style.transform = 'scale(1.1)';
            }
        });
        
        // إضافة وقت حسب المستوى
        const { timeLimit } = getDifficultySettings();
        const bonusTime = timeLimit < 20 ? 3 : 5;
        gameData.timer += bonusTime;
        
        // تأثير بصري
        elements.questionIcon.style.transform = 'scale(1.5) rotate(360deg)';
        elements.questionIcon.style.color = '#ffff00';
        setTimeout(() => {
            elements.questionIcon.style.transform = 'scale(1) rotate(0deg)';
            elements.questionIcon.style.color = '';
        }, 1000);
    }
});

// إنشاء جسيمات بصرية
function createParticles() {
    const { numChoices, timeLimit } = getDifficultySettings();
    const particleCount = numChoices > 4 ? 40 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        elements.particleContainer.appendChild(particle);
        
        // إزالة الجسيم بعد انتهاء الأنيميشن
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
}

// بدء اللعبة
generateQuestion();
