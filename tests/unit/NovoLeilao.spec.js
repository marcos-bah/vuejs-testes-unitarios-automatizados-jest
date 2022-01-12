import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'


jest.mock('@/http')

const $router = {
    push: jest.fn()
}

describe('Um novo leilao deve ser criado', ()=> {
    test('dado o formulario preenchido, um leilao deve ser criado', ()=> {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        })

        wrapper.find('.produto').setValue('Um livro da casa do código')
        wrapper.find('.descricao').setValue('Um maravilhoso livro sobre Vue')
        wrapper.find('.valor').setValue(49)
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled()
    })
})