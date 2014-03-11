'use strict';
var Parser = require('web-htmlparser');

Parser.craw("http://diana.imis.athena-innovation.gr/DianaTools/index.php?r=tarbase/index&mirnas=hsa-let-7c", Parser.writeTestFile);


