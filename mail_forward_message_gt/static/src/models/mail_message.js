/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {attr} from '@mail/model/model_field';
import {formatDateTime, parseDateTime} from "@web/core/l10n/dates";

registerPatch({
    name: 'Message',
    modelMethods: {
        /**
         * @override
         */
        convertData(data) {
            const data2 = this._super(data);
            if ('is_forward' in data) {
                data2.isForward = data.is_forward;
            }
            if ('src_author' in data) {
                data2.srcAuthor = data.src_author;
            }
            if ('src_date' in data) {
                data2.srcDate = formatDateTime(parseDateTime(data.src_date), {timezone: true});
            }
            return data2;
        },
    },
    fields: {
        isForward: attr({
            default: false,
        }),
        srcAuthor: attr(),
        srcDate: attr(),
        canBeForwarded: attr({
            compute() {
                if (!this.originThread) {
                    return false;
                }
                if (this.trackingValues.length > 0) {
                    return false;
                }
                if (this.message_type !== 'comment') {
                    return false;
                }
                if (this.originThread.model === 'mail.channel') {
                    return true;
                }
                return true;
            }
        }),
        canBeDeleted: {
            /**
             * @override
             */
            compute() {
                let res = this._super();
                return res && !this.isForward;
            }
        },
    }
})
