// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Request for absent service. Reject with NotFoundError.';

bluetooth_test(
    () => getHealthThermometerDevice({
            filters: [{services: ['health_thermometer']}],
            optionalServices: ['glucose']
          })
              .then(
                  ({device}) => assert_promise_rejects_with_message(
                      device.gatt.getPrimaryService('glucose'),
                      new DOMException(
                          `No Services matching UUID ${
                              glucose.uuid} found in Device.`,
                          'NotFoundError'))),
    test_desc);
