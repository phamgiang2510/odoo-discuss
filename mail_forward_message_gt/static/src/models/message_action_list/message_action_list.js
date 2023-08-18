/** @odoo-module **/

import {registerInstancePatchModel, registerFieldPatchModel} from '@mail/model/model_core';
import {attr} from '@mail/model/model_field';

registerInstancePatchModel('mail.message_action_list', 'mail_forward_message_gt/static/src/models/message_action_list.js', {
    _created() {
        this.onClickForward = this.onClickForward.bind(this);
        this.onClickConfirmForward = this.onClickConfirmForward.bind(this);
        this.onForwardMessageDialogClosed = this.onForwardMessageDialogClosed.bind(this);
        return this._super(...arguments);
    },

    onClickForward(ev) {
        this.update({showForwardPopup: true});
    },

    onClickConfirmForward(ev) {
        this.update({showForwardPopup: false});
    },

    onForwardMessageDialogClosed(ev) {
        this.update({showForwardPopup: false});
    },
});

registerFieldPatchModel('mail.message_action_list', 'mail_forward_message_gt/static/src/models/message_action_list.js', {
    showForwardPopup: attr({
        default: false,
    }),
});
