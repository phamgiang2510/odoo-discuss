/** @odoo-module **/

import {useComponentToModel} from '@mail/component_hooks/use_component_to_model';
import {registerMessagingComponent} from '@mail/utils/messaging_component';
import {unaccent} from '@web/core/utils/strings';

const {Component, useRef, useState, useEffect, onWillStart} = owl;

export class ForwardMessageConfirm extends Component {

    /**
     * @override
     */
    setup() {
        super.setup();
        useComponentToModel({fieldName: 'component'});
        this.state = useState({});
        this.inputRef = useRef('input');
        onWillStart(async () => {
            await this.searchChannel();
        })
        useEffect(
            () => {
                $(this.inputRef.el).focus();
            },
            () => []
        )
    }

    get forwardMessageConfirmView() {
        return this.props.record;
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
        await this.messaging.models['Partner'].imSearch({
            callback: partners => {
                self.state.partners = partners;
            },
            keyword: searchValue,
            limit: 10,
        })
        this.state.threads = await this.messaging.models['Thread'].searchChannelsToOpen({
            limit: 10,
            searchTerm: searchValue,
        })
    }
}

Object.assign(ForwardMessageConfirm, {
    props: {record: Object},
    template: 'mail.ForwardMessageConfirm',
});

registerMessagingComponent(ForwardMessageConfirm);
