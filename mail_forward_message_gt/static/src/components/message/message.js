/** @odoo-module **/

import {patch} from '@web/core/utils/patch';
import {Message} from '@mail/components/message/message';

patch(Message.prototype, 'mail_forward_message_gt/static/src/components/message/message.js', {
    get isActive() {
        return this._super() || Boolean(
            this.messageView &&
            this.messageView.messageActionList &&
            this.messageView.messageActionList.showForwardPopup
        )
    }
})
