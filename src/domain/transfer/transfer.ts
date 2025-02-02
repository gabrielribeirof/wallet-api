import { AggregateRoot } from '@/shared/seedwork/aggregate-root';
import { UniqueIdentifier } from '@/shared/seedwork/unique-identifier';
import { Monetary } from '@/shared/domain/monetary';
import { Either, left, right } from '@/shared/lib/either';
import { TransferAmountMustBeGreaterThanZeroError } from '@/shared/errors/transfer-amount-must-be-greater-than-zero.error';
import { Error } from '@/shared/seedwork/error';

interface TransferProperties {
	originId: UniqueIdentifier;
	targetId: UniqueIdentifier;
	amount: Monetary;
}

export class Transfer extends AggregateRoot<TransferProperties> {
	get originId() {
		return this.props.originId;
	}

	get targetId() {
		return this.props.targetId;
	}

	get amount() {
		return this.props.amount;
	}

	private constructor(props: TransferProperties, id?: UniqueIdentifier) {
		super(props, id);
	}

	public static create(
		props: TransferProperties,
		id?: UniqueIdentifier,
	): Either<Error, Transfer> {
		if (props.amount.value <= 0) {
			return left(new TransferAmountMustBeGreaterThanZeroError());
		}

		return right(new Transfer(props, id));
	}
}
