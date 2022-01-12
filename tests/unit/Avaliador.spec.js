import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Produto 1',
        lanceInicial: 100,
        descricao: 'Livro de VueJS',
    },
    {
        produto: 'Produto 2',
        lanceInicial: 200,
        descricao: 'Livro de Angular',
    },
]

describe('Avaliador que se conecta com a API', () => {
    test('deve carregar os leiloes pela api', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)
    })

    test('não há leiloes retorndados pela api', async () => {
        getLeiloes.mockResolvedValueOnce()

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)
    })


})