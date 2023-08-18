/** @odoo-module **/

import {registerClassPatchModel, registerInstancePatchModel, registerFieldPatchModel} from '@mail/model/model_core';
import {attr} from '@mail/model/model_field';
import {formatDateTime, parseDateTime} from "@web/core/l10n/dates";

registerClassPatchModel('mail.message', 'mail_forward_message_gt/static/src/models/mail_message.js', {
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
            data2.srcDate = formatDateTime(parseDateTime(data.src_date), { timezone: true });
        }
        return data2;
    },
});

registerInstancePatchModel('mail.message', 'mail_forward_message_gt/static/src/models/mail_message.js', {
    _computeCanBeForwarded() {
        if (!this.originThread) {
            return false;
        }
        if (this.tracking_value_ids.length > 0) {
            return false;
        }
        if (this.message_type !== 'comment') {
            return false;
        }
        if (this.originThread.model === 'mail.channel') {
            return true;
        }
        return true;
    },

    _computeCanBeDeleted() {
        let res = this._super();
        return res && !this.isForward;
    }
});

registerFieldPatchModel('mail.message', 'mail_forward_message_gt/static/src/models/mail_message.js', {
    canBeForwarded: attr({
        compute: '_computeCanBeForwarded',
    }),
    isForward: attr({
        default: false,
    }),
    srcAuthor: attr(),
    srcDate: attr(),
});
