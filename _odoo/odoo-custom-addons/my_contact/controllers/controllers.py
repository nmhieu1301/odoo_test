# -*- coding: utf-8 -*-
# from odoo import http


# class MyContact(http.Controller):
#     @http.route('/my_contact/my_contact/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/my_contact/my_contact/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('my_contact.listing', {
#             'root': '/my_contact/my_contact',
#             'objects': http.request.env['my_contact.my_contact'].search([]),
#         })

#     @http.route('/my_contact/my_contact/objects/<model("my_contact.my_contact"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('my_contact.object', {
#             'object': obj
#         })
