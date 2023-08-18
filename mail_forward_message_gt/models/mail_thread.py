from odoo import models


class MailThread(models.AbstractModel):
    _inherit = 'mail.thread'

    def _message_create(self, values_list):
        if not isinstance(values_list, list):
            values_list = [values_list]
        src_message_id = self._context.get('default_src_message_id', False)
        if src_message_id:
            src_message = self.env['mail.message'].browse(src_message_id).exists()
            if src_message:
                for values in values_list:
                    values['src_message_id'] = src_message_id
                    values.update({
                        'is_forward': True,
                        'src_message_id': src_message_id,
                        'src_author_id': src_message.author_id.id,
                        'src_date': src_message.date,
                    })
        return super(MailThread, self)._message_create(values_list)
