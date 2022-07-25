// file to check how to use snapshot beyond the regular component approach
// by writting to a file
const fs = require("fs");
const os = require("os");

const path = `${os.tmpdir()}\\report.txt`;
module.exports.generateTextReport = (items) => {
  const lines = items.map(({ item, quantity, price }) => {
    return `${item} - Quantity : ${quantity} - value : ${price * quantity}`;
  });

  const total = items.reduce((sum, { price }) => {
    return sum + price;
  }, 0);

  const content = lines.concat(`Total value: ${total}`).join("\n");
  fs.writeFileSync(path, content);
};
