/** @odoo-module **/

import {useEffect} from "@web/core/utils/hooks";
import {unaccent} from '@web/core/utils/strings';
import {registerMessagingComponent} from '@mail/utils/messaging_component';
import Dialog from 'web.OwlDialog';
import session from 'web.session';

const {Component} = owl;
const {useRef, useState} = owl.hooks;

export class ForwardMessageDialog extends Component {
    setup() {
        super.setup();
        this.title = this.env._t("Forward");
        this.state = useState({});
        this.dialogRef = useRef('dialog');
        this.inputRef = useRef('input');
        useEffect(
            () => {
                $(this.inputRef.el).focus();
            },
            () => []
        )
    }

    async willStart() {
        await this.searchChannel();
    }

    get messageActionList() {
        return this.messaging && this.messaging.models['mail.message_action_list'].get(this.props.messageActionListLocalId);
    }

    async onInput(ev) {
        let searchValue = unaccent((ev.target.value || '').toLowerCase());
        if (!this.messaging) {
            return;
        }
        await this.searchChannel(searchValue)
    }

    async searchChannel(searchValue='') {
        let self = this;
        await this.messaging.models['mail.partner'].imSearch({
            callback: partners => {
                self.state.partners = partners;
            },
            keyword: searchValue,
            limit: 10,
        })
        this.state.threads = await this.messaging.models['mail.thread'].searchChannelsToOpen({
            limit: 10,
            searchTerm: searchValue,
        })
    }

    async onClickForward(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let $btn = $(ev.currentTarget);
        $btn.attr('disabled', 'disabled');
        $btn.prepend('<i class="fa fa-refresh fa-spin"/>');
        let channelId = $(ev.currentTarget).data('channel_id');
        let partnerId = $(ev.currentTarget).data('partner_id');
        let messageId = this.messageActionList.messageViewForDelete.message.id;
        await this.env.services.rpc({
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
    }
}

Object.assign(ForwardMessageDialog, {
    components: {
        Dialog,
    },
    props: {
        messageActionListLocalId: String,
    },
    template: 'mail.ForwardMessageDialog',
});

registerMessagingComponent(ForwardMessageDialog);
