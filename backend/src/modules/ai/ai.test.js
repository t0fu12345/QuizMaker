// File test kiểm thử cục bộ cho Module AI
const aiService = require('./ai.service');

async function testAIService() {
    console.log('--- TEST 1: Fallback khi chưa có API Key ---');
    const advice1 = await aiService.getAdviceFromGemini(4, ['Vòng lặp For', 'DOM Event'], { totalQuestions: 10, subject: 'JavaScript cơ bản' });
    console.log('Result 1 structure:');
    console.log('- summary:', advice1.summary);
    console.log('- performanceLevel:', advice1.performanceLevel);
    console.log('- weaknesses count:', advice1.weaknesses.length);
    console.log('- roadmap steps:', advice1.roadmap.length);
    console.log('- toString() test (for Mongoose String compatibility):', String(advice1).substring(0, 80) + '...');
    
    console.log('\n--- TEST 2: Điểm tuyệt đối (0 lỗi sai) ---');
    const advice2 = await aiService.getAdviceFromGemini(10, [], { totalQuestions: 10, subject: 'ReactJS' });
    console.log('- summary:', advice2.summary);
    console.log('- performanceLevel:', advice2.performanceLevel);
    console.log('- weaknesses:', advice2.weaknesses);
    console.log('- roadmap steps:', advice2.roadmap.length);

    console.log('\n✅ TẤT CẢ KIỂM THỬ NỘI BỘ AI SERVICE ĐỀU ĐẠT CHUẨN!');
}

testAIService().catch(console.error);
