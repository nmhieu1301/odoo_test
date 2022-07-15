# -*- coding: utf-8 -*-
# from odoo import http


# class Attendants(http.Controller):
#     @http.route('/attendants/attendants/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/attendants/attendants/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('attendants.listing', {
#             'root': '/attendants/attendants',
#             'objects': http.request.env['attendants.attendants'].search([]),
#         })

#     @http.route('/attendants/attendants/objects/<model("attendants.attendants"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('attendants.object', {
#             'object': obj
#         })
