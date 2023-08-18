import base64
from odoo import api, models, _
from odoo.exceptions import UserError


class MailChannel(models.Model):
    _inherit = 'mail.channel'

    @api.model
    def message_forward(self, message_id, channel_id=None, partner_id=None):
        if not channel_id and not partner_id:
            raise UserError(_("'channel_id' or 'partner_id' must be specified."))
        message = self.env['mail.message'].browse(message_id)
        if not channel_id and partner_id:
            channel_id = self.channel_get([partner_id])['id']
        channel = self.browse(channel_id)
        if message.attachment_ids:
            attachments = [
                (att.name, base64.b64decode(att.datas))
                for att in message.attachment_ids
            ]
        else:
            attachments = None
        return channel.with_context(
            default_src_message_id=message.src_message_id and message.src_message_id.id or message_id
        ).message_post(
            body=message.body,
            message_type=message.message_type,
            attachments=attachments,
            subtype_id=message.subtype_id.id,
        )
