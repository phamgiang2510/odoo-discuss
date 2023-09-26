/** @odoo-module **/

import {registerModel} from '@mail/model/model_core';
import {attr, one} from '@mail/model/model_field';
import {clear} from '@mail/model/model_field_command';

registerModel({
    name: 'ForwardMessageConfirmView',
    recordMethods: {
        containsElement(element) {
            return Boolean(this.component && this.component.root.el && this.component.root.el.contains(element));
        },
        onClickCancel() {
            this.dialogOwner.delete();
        },
        async onClickForward(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            let $btn = $(ev.currentTarget);
            $btn.attr('disabled', 'disabled');
            $btn.prepend('<i class="fa fa-fw fa-refresh fa-spin"/>');
            let channelId = $(ev.currentTarget).data('channel_id');
            let partnerId = $(ev.currentTarget).data('partner_id');
            let messageId = this.message.id;
            await this.messaging.rpc({
                model: 'mail.channel',
                method: 'message_forward',
                kwargs: {
                    message_id: messageId,
                    partner_id: partnerId,
                    channel_id: channelId,
                },
            });
            $btn.removeClass('btn-primary')
                .addClass('btn-light')
                .html(`<i class="fa fa-check"/> ${this.env._t("Forwarded")}`);
        },
    },
    fields: {
        component: attr(),
        dialogOwner: one('Dialog', {
            identifying: true,
            inverse: 'forwardMessageConfirmView',
        }),
        message: one('Message', {
            compute() {
                return this.dialogOwner.messageActionViewOwnerAsForwardConfirm.messageAction.messageActionListOwner.message;
            },
            required: true,
        }),
        messageView: one('MessageView', {
            compute() {
                return this.message ? {message: this.message} : clear();
            },
            inverse: 'forwardMessageConfirmViewOwner',
            required: true,
        }),
    },
});
