let expect = require ('expect');

var {generateMessage} = require('./message');

describe ('Generate message', ()=>{
  it("should generate correct message object",()=>{
    let from ="WDJ",
    text = "some random text",
    message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});
