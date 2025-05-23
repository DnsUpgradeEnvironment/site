opensdg.chartColors = function(indicatorId) {
  var colorSet = {{ site.graph_color_set | jsonify }};
  var numberOfColors = {{ site.graph_color_number | jsonify }};
  var customColorList = {{ site.graph_color_list | jsonify }};

  this.goalNumber = parseInt(indicatorId.slice(indicatorId.indexOf('_')+1,indicatorId.indexOf('-')));
  this.goalColors = [
                //['891523', 'ef7b89', '2d070b', 'f4a7b0', 'b71c2f', 'ea4f62', '5b0e17', 'fce9eb'],
                ['c41f35', 'f03a4e', 'a5182c', 'ff4f60', '8c1425', 'd13043', 'b91739', 'ed6a76'],
                //['896d1f', 'efd385', '2d240a', 'f4e2ae', 'b7922a', 'eac55d', '5b4915', 'f9f0d6'],
                ['c5922e', 'f2b947', 'a6741f', 'ffd155', '8d601a', 'e8aa34', 'b97f23', 'f8c765'],
                //['2d5f21', '93c587', '0f1f0b', 'c9e2c3', '3c7f2c', '6fb25f', '1e3f16', 'a7d899'],
                ['1b5e20', 'bfff00', '00bcd4', 'd4c000', '00ffa3', '00695c', '7b661a', '98ff98'],
                // ['760f1b', 'dc7581', '270509', 'f3d1d5', '9d1424', 'd04656', '4e0a12', 'e7a3ab'],
                ['aa1629', 'e0263c', '911323', 'f14455', '7a101e', 'cd2d41', 'a91e2f', 'e86672'],
                // ['b22817', 'ff7563', '330b06', 'ffd7d2', 'cc2e1a', 'ff614d', '7f1d10', 'ff9c90'],
                ['e6351e', 'ff583f', 'c72c17', 'ff755e', 'a82413', 'f54c2e', 'd03a22', 'ff9985'],
                // ['167187', '7cd7ed', '07252d', 'd3f1f9', '1e97b4', '51cae7', '0f4b5a', 'a8e4f3'],
                ['1ea6c8', '4ed0f1', '168db1', '7bdcf6', '106d92', '3cc0e1', '289bbf', '90e5fb'],
                // ['977506', 'fddb6c', '322702', 'fef3ce', 'c99c08', 'fccf3b', '644e04', 'fde79d'],
                ['e0ad0a', 'ffda26', 'ba9108', 'ffe74c', '9b7506', 'f7c926', 'c49c0f', 'ffe36f'],
                // ['610f27', 'c7758d', 'ecd1d9', '811434', 'b44667', '400a1a', '400a1a', 'd9a3b3'],
                ['891538', 'c12755', '6e102d', 'd83c67', '590c24', 'ad2a4e', '911e3b', 'e26484'],
                // ['973f16', 'fda57c', '321507', 'fee1d3', 'ca541d', 'fd8750', '652a0e', 'fec3a7'],
                ['e55d20', 'ff8644', 'ba4a19', 'ffa165', '933a14', 'f77135', 'c75424', 'ffb188'],
                // ['840b3d', 'ea71a3', '2c0314', 'f8cfe0', 'b00f52', 'd5358b', '580729', 'f1a0c2'],
                ['bf1058', 'f22a78', '9f0d4a', 'ff4e90', '800a3d', 'e53078', 'b91e5c', 'ff7aa6'],
                // ['653e0e', 'fed7a7', 'b16d19', 'fdba65', 'b14a1e', 'fd976b', '000000', 'fed2bf'],
                ['e48b20', 'ffb44c', 'ba6f19', 'ffc874', '935814', 'f6a538', 'cb7d25', 'ffd192'],
                // ['785b1b', 'dec181', '281e09', 'f4ead5', 'a07a24', 'd3ad56', '503d12', 'e9d6ab'],
                ['a87726', 'd7a543', '875e1d', 'efbe5c', '6e4a16', 'c99536', '9b6d23', 'f1cb7b'],
                // ['254b28', '8bb18e', '0c190d', 'd8e5d9', '326436', '659769', '19321b', 'b2cbb4'],
                ['356d3a', '589d5b', '27542c', '79b783', '1f3f21', '49874b', '326b38', '90c69c'],
                // ['065a82', '6cc0e8', '021e2b', 'ceeaf7', '0878ad', '3aabe0', '043c56', '9dd5ef'],
                ['0884bf', '33b0ed', '066f9f', '5acdfb', '05557a', '1a9fd9', '127dad', '80dbfa'],
                //['337319', '99d97f', '112608', 'ddf2d4', '449922', '77cc55', '224c11', 'bbe5aa'],
                ['005c8b', '1f8fc0', '004b73', '46b3e2', '003b57', '1d7aaa', '005f84', '6dc9ec'],
                //['254b28', '8bb18e', '0c190d', 'd8e5d9', '326436', '659769', '19321b', 'b2cbb4'],
                ['3ea122', '70d645', '2b7f1c', '9bdc63', '178b4a', '5da02f', '87c96f', '2d6214'],
                //['00293e', '99c2d7', '00486d', '4c95ba', '126b80', 'cce0eb', '5a9fb0', 'a1c8d2'],
                ['005c8b', '1f8fc0', '004b73', '46b3e2', '003b57', '1d7aaa', '005f84', '6dc9ec'],
                //['0a1c2a', '8ca3b4', '16377c', 'd1dae1', '11324a', '466c87', '5b73a3', '0f2656']
                ['153d5a', '2e6a90', '102f45', '4d91c0', '0b2230', '266089', '1b4562', '73aed7']];
  this.colorSets = {'classic':['7e984f', '8d73ca', 'aaa533', 'c65b8a', '4aac8d', 'c95f44'],
                  'sdg':['e5243b', 'dda63a', '4c9f38', 'c5192d', 'ff3a21', '26bde2', 'fcc30b', 'a21942', 'fd6925', 'dd1367', 'fd9d24', 'bf8b2e', '3f7e44', '0a97d9', '56c02b', '00689d', '19486a'],
                  'goal': this.goalColors[this.goalNumber-1],
                  'custom': customColorList,
                  'accessible': ['cd7a00', '339966', '9966cc', '8d4d57', 'A33600', '054ce6']};
  if(Object.keys(this.colorSets).indexOf(colorSet) == -1 || (colorSet=='custom' && customColorList == null)){
    return this.colorSets['accessible'];
  }
  this.numberOfColors = (numberOfColors>this.colorSets[colorSet].length || numberOfColors == null || numberOfColors == 0) ? this.colorSets[colorSet].length : numberOfColors;
  this.colors = this.colorSets[colorSet].slice(0,this.numberOfColors);

  return this.colors;

};
