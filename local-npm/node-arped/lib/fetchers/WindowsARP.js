'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ARP2 = require('./ARP');

var _ARP3 = _interopRequireDefault(_ARP2);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WindowsARP = function (_ARP) {
    (0, _inherits3.default)(WindowsARP, _ARP);

    function WindowsARP() {
        (0, _classCallCheck3.default)(this, WindowsARP);
        return (0, _possibleConstructorReturn3.default)(this, (WindowsARP.__proto__ || (0, _getPrototypeOf2.default)(WindowsARP)).call(this));
    }

    (0, _createClass3.default)(WindowsARP, [{
        key: 'fetch',
        value: function fetch() {
            var result = _child_process2.default.spawnSync('arp', ['-a']);
            if (result.error) {
                throw error;
            }
//            return result.stdout.toString();
            const lines = result.stdout.toString().split('\n');

            const NetIDRegex = /0x([0-9a-fA-F])+/;
            const IPv4Regex = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;

            const netprefix = 'en' ;
            let interf_id = netprefix+'-1';

            let ret = [] ;
            lines.forEach(line=>{
              line = line.trimRight() ;
              if( line.match(/^ /) ){
                if( !IPv4Regex.exec(line) ) return ;
                ret.push(line+'  '+interf_id) ;
                return ;
              }
              let NetIDResult = NetIDRegex.exec(line);
              if( NetIDResult == null ) return ;
              interf_id = netprefix + NetIDResult[0].slice(2) ;
            });

            return ret.join('\r\n') ;

        }
    }]);
    return WindowsARP;
}(_ARP3.default);

exports.default = WindowsARP;