import * as Aspect from 'barium-aspect';
import * as EntitySignature from 'barium-entity-signature';
import * as Decorators from 'barium-decorators';

@Decorators.ComponentClass
class TestComp0 {}

@Decorators.ComponentClass
class TestComp1 {}

@Decorators.ComponentClass
class TestComp2 {}

export function testAspect(): void {
  describe('Aspect', () => {
    it('should be created', () => {
      var asp = Aspect.all([TestComp0, TestComp1, TestComp2]);
      expect(asp).toBeDefined();
    });
    describe('should match signatures correcrtly', () => {
      var asp0 = Aspect.all([TestComp0, TestComp1, TestComp2]);
      var asp1 = Aspect.all([TestComp0]);
      var asp2 = Aspect.all([TestComp1, TestComp2]);
      var signature0 = EntitySignature.create();
      EntitySignature.addComponent(signature0, TestComp0);
      EntitySignature.addComponent(signature0, TestComp1);
      EntitySignature.addComponent(signature0, TestComp2);
      var signature1 = EntitySignature.create();
      EntitySignature.addComponent(signature1, TestComp0);
      var signature2 = EntitySignature.create();
      EntitySignature.addComponent(signature2, TestComp1);
      EntitySignature.addComponent(signature2, TestComp2);

      it('should handle exact matches', () => {
        console.log(signature0, asp0);
        expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
        expect(Aspect.signatureMatchesAspect(signature1, asp1)).toBeTruthy();
        expect(Aspect.signatureMatchesAspect(signature2, asp2)).toBeTruthy();
      });

      it('should handle superset matches', () => {
        expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeTruthy();
        expect(Aspect.signatureMatchesAspect(signature0, asp1)).toBeTruthy();
        expect(Aspect.signatureMatchesAspect(signature0, asp2)).toBeTruthy();
      });

      it('should handle falsy matches', () => {
        expect(Aspect.signatureMatchesAspect(signature1, asp0)).toBeFalsy();
        expect(Aspect.signatureMatchesAspect(signature2, asp0)).toBeFalsy();
      });

      it('should handle falsy matches for removed components', () => {
        EntitySignature.removeComponent(signature0, TestComp0);
        expect(Aspect.signatureMatchesAspect(signature0, asp0)).toBeFalsy();
      });
    });

  });
};
