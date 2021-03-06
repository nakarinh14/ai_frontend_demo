export default {
  common: {
    login: '登入',
    register: '注册',
  },
  home: {
    title: '新型冠狀肺炎眼部檢測風險篩查免費測試',
    single: '快速檢測',
    multi: '高級檢測',
    login: '登入體驗',
    test: '前往測試',
    alert: '注意！',
    alert_1: '1. 本工具為科研內部測試版本，僅用於固定邀請的科研對象使用，並不對外進行任何公開測試，且所使用和評估內容不能代替醫生面診和任何醫療工具所檢測的結果。 本測試版僅為中國用戶註冊使用。 嚴禁不在中國境內的用戶使用，並承擔一切法律責任和相應後果',
    alert_2: '2. 本研究和軟件不會未經您同意的情况下，收集您的任何隱私資訊，包括個人病歷及個人資訊。 同時為保護您個人隱私，要求您注册時務必不使用真實姓名，拍攝和上傳照片時只提供眼部照片即可，若對個人隱私有任何疑問，請務必不要對本軟件進行任何操作。',
    alert_3: '3. 糖尿病和流感檢測即將開放內測！ 如果檢測結果是高風險，請發郵件給 service@aimomics.org 進行覆核。',
    agree: '同意',
    cancel: '拒絕',
    check_ip_enable: '抱歉，現時新冠眼部檢測DEMO僅限於中國境內用戶試用. （禁止中國境外VPN用戶！）',
    check_max_test: '抱歉，今日您的免費試用次數已達上限，請明日再次體驗',
  },
  login: {
    input_phone: '請輸入手機號',
    input_password: '請輸入密碼',
    logining: '登入中…',
    forget: '忘記密碼？',
    success: '登入成功！'
  },
  register: {
    input_phone: '手機號',
    input_phone_error: '請輸入正確的手機號',
    input_code: '驗證碼',
    input_code_error: '驗證碼為四位數',
    code_sending: '發送中…',
    code_waiting: '秒再次獲取',
    code_send: '獲取驗證碼',
    password_placehold: '密碼為8-16比特，必須包含大、小寫字母和數位',
    input_password: '請輸入密碼',
    input_invite: '請輸入邀請碼',
    agree: '同意注册條款',
    registering: '注册中…',
    agreement: '注册條款',
    agreement_checked: '請勾選注册條款！',
    success: '注册成功！',
    phone_empty: '手機號不能為空！',
    send_success: '發送成功！'
  },
  order: {
    step_0_title: '拍照或上傳清晰的眼部照片',
    step_0_camera: '拍照上傳',
    step_0_choose: '相册選取',
    step_1_camera: '重新拍照',
    step_1_choose: '重新選取',
    step_1_next: '下一步',
    step_1_tip_0: '1. 為保證檢測準確性，請按下圖標準拍攝和上傳照片。',
    step_1_tip_1: '2. 請把照片在荧幕上通過縮放和移動，使眼部位置在白色虛線框內，並與圖例一致後進行下一步操作。',
    step_2_title: '圖片預覽',
    step_2_tip_1: '請再次確認是否已取下眼鏡（隱性眼鏡），以及即將檢測的眼部圖片，是否與下麵所示例的圖片一致。 若不一致將導致錯誤檢測結果。',
    step_2_tip_2: '請按“開始檢測”繼續或“返回重拍”調整圖片',
    step_2_test: '開始檢測',
    step_2_back: '返回重拍',
    step_3_title: '正在獲取眼部識別結果',
    step_4_title: '識別失敗！ 請重新識別',
    step_5_title: '檢測結果',
    step_5_low: 'CV19低風險',
    step_5_high: 'CV19高風險',
    step_5_rePredict: '重新預測',
    tip_0: '1. 請依次拍攝，或者選擇手機上的眼部照片，並按照圖例對齊，上傳獲取測試結果；',
    step_6_tip: '可聯繫我們免費複測',
    high_risk_tip_0: '注意：',
    high_risk_tip_1: '本次檢測結果為疑似高風險，希望您能儘快與我們取得聯系並進行覆核，我們會儘快迴響，向您提出進一步的建議，發',
    high_risk_tip_2: '郵件',
    high_risk_tip_3: '或點擊',
    high_risk_tip_4: '工單',
    high_risk_tip_5: '發送資訊',
    high_risk_tip_confirm: '確認',
    not_empty: '不可為空'
  },
  multi: {
    img0: '正',
    img1: '左',
    img2: '右',
    img3: '上',
    img4: '下',
    pre: '上一張',
    next: '下一張',
    uploadMissing: '請上傳照片',
    tip_0: '1. 請按照前左右上依次拍攝，或者選擇手機上的四張不同角度眼部照片，並按照圖例對齊，上傳獲取測試結果；',
    tip_1: '2. 測試者需在光線充足的明亮環境下進行拍攝，避免紅色背景前拍攝；',
    tip_2: '3. 測試者的眼部不能化妝，不能佩戴隱形眼鏡，不能被頭髮遮擋；',
    tip_3: '4. 相機不低於300萬點數，眼部圖片分辯率高於1900X500，並關閉所有相機濾鏡功能；',
    tip_4: '5. 拍攝後需要按照頁面提示，手動對眼部照片進行縮放移動和裁剪，裁剪後的眼部照片不能出現背景。',
    step_2_tip_1: '請再次確認是否已取下眼鏡（隱性眼鏡），以及即將檢測的眼部圖片，是否與左側所示例的圖片一致。 若不一致將導致錯誤檢測結果。',
  },
  about: {
    title: '關於我們',
    version: '版本',
    tip: '我們是一個由國際化的機器學習科學家，醫學專家，商業專家組成的實驗室團隊，專注致力於人體眼部錶型組檢測研究與商業化應用； 希望我們的眼部檢測科技能為全球公共與生命科學領域帶來全新的發現，並與更多的全球合作者一起面對更多艱巨的人類健康風險挑戰，同時以醫學安全與醫學倫理作為我們的至高原則！',
    email: '郵箱：'
  },
  password: {
    title: '修改密碼',
    input_origin: '輸入當前登入密碼',
    input_new: '請輸入新密碼',
    save: '保存',
    saving: '保存中…'
  },
  forget: {
    title: '忘記密碼',
    submit: '提交',
    submiting: '提交中…',
  },
  mine: {
    help_center: '幫助中心',
    setting: '設定',
    history: '識別歷史',
    message_center: '消息中心',
    system_message: '系統消息',
    register_success: '注册成功，歡迎您',
  },
  setting: {
    faq: '使用幫助',
    title: '設定',
    agreement: '使用條款',
    language: '語言切換',
    message: '消息提醒',
    chinese: '简体中文',
    hk: '繁體中文',
    english: 'English',
    logout: '登出',
  },
  history: {
    tip: '本研究和軟件不會未經您同意的情况下，收集您的任何隱私資訊，包括個人病歷及個人資訊。',
    multi: '多張',
    single: '單張',
    low_risk: '低風險',
    high_risk: '高風險',
  },
  http: {
    403: '登入過期，請重新登入',
    404: '請求的資源不存在'
  }
}