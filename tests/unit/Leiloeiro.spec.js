import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
    produto: 'Um livro da casa do código',
    lanceInicial: 49,
    descricao: 'Um maravilhoso livro sobre Vue',
}

const lances = [
    {
        id: 1,
        valor: 100,
        data: '2020-01-01T00:00:00.000Z',
        leilao_id: 1,
    },
    {
        id: 2,
        valor: 200,
        data: '2020-01-01T00:00:00.000Z',
        leilao_id: 1,
    },
    {
        id: 3,
        valor: 300,
        data: '2020-01-01T00:00:00.000Z',
        leilao_id: 1,
    },
]

describe('Leiloreiro inicia um leilão qu não possui lances', ()=> {
    test('não possui lances', async ()=> {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])
        const wrapper = mount(Leiloeiro,{
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const alerta = wrapper.find('.alert-dark')
        expect(alerta.exists()).toBe(true)
    })
});

describe('Leiloreiro exibe os lances exitentes', ()=> {
    test('Não mostra o aviso de "sem lances"', async ()=> {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro,{
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const alerta = wrapper.find('.alert-dark')
        expect(alerta.exists()).toBe(false)

    })
    test('Mostra a lista de lances', async ()=> {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro,{
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const listaLances = wrapper.find('.list-inline')
        expect(listaLances.exists()).toBe(true)

    })
})


describe('Um leiloeiro comunica os valores de menor e maior lance', ()=> {
    test('Mostra o maior lance daquele leilão', async ()=> {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro,{
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 300')
    })

    test('Mostra o menor lance daquele leilão', async ()=> {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro,{
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 100')
        
    })
})