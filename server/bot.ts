
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;

export function setupBot() {
  if (!token) {
    console.warn("TELEGRAM_BOT_TOKEN not set, bot will not start.");
    return;
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Отправить подарок',
              url: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/submit` // Fallback URL construction, better to use domain if available
              // Or better: url: 'https://' + process.env.REPLIT_DEV_DOMAIN + '/submit'
            }
          ]
        ]
      }
    };
    
    // Construct the URL properly
    // Note: In dev, the URL might be different. 
    // Best effort:
    const baseUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

    bot.sendMessage(chatId, 'Привет! Я бот для отправки подарков Лизе Белль! Хотите отправить Лизе подарок? Нажмите на кнопку ниже "Отправить подарок", так же вас там ждет виш лист.', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Отправить подарок',
              url: `${baseUrl}/submit` // Link to the submission page
            }
          ]
        ]
      }
    });
  });

  console.log("Telegram Bot started.");
}
